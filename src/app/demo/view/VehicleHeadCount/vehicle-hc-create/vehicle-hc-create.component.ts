import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { vehicleHeadCountDto } from 'src/app/demo/domain/Dto/Vehicles/vehicleHeadCountDto';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vehicle-create',
    templateUrl: './vehicle-hc-create.component.html',
    styleUrls: ['./vehicle-hc-create.component.scss']
})
export class VehicleHeadCountCreateComponent implements OnInit {

    vehicleHc: vehicleHeadCountDto;
    vehicleDialog: boolean;
    submitted: boolean;
    vehicleForm: FormGroup;
    btnloading: boolean = false;
    @Output() eventChange = new EventEmitter<Event>();
    @Output() createModalToggle = new EventEmitter<void>();
    @Input("vehicle_no") vehicle_no: string;
    showCreateModal: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private service: VehicleService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadForm();
    }
    ngOnChanges(change: SimpleChange) {
        if (!!change['vehicle_no']?.currentValue) {
            this.vehicleForm.controls["vehicle_no"].setValue(change['vehicle_no'].currentValue)
        }
    }

    loadForm() {
        this.vehicleForm = this.formBuilder.group({
            vehicle_no: ["", [Validators.required]],
            token: ["", [Validators.required]],
            url: ["", [Validators.required]]
        });
    }

    onSubmitForm() {
        this.btnloading = true;
        if (this.vehicleForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.service.setVehicleHeadCount(this.vehicleForm.value).pipe(first())
            .subscribe({
                next: (response) => {
                    this.vehicleDialog = false;
                    if (response.status) {
                        this.resetForm();
                        this.eventChange.emit();
                        this.showCreateModal = false
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.btnloading = false;
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }

    resetForm() {
        this.vehicleForm.reset();
        this.btnloading = false;
        this.vehicleForm.controls["vehicle_no"].setValue(this.vehicle_no)
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    showModal() {
        this.showCreateModal = true
    }
}
