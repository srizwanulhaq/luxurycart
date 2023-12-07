import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VehicleTypedao } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vtype-form',
    templateUrl: './vtype-form.component.html',
    styleUrls: ['./vtype-form.component.scss']
})
export class VehicleTypeFormComponent implements OnInit {

    formMode: string
    @Input("vehicleType") vehicleType: VehicleTypedao
    @Input("showModal") showModal: boolean
    submitted: boolean = false;
    dataForm;
    btnloading: boolean = false;
    @Output() eventChange = new EventEmitter<any>();
    @Output() closeForm = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder,
        private service: VehicleService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef) {
        this.loadForm();
    }

    ngOnInit(): void { }

    ngOnChanges(change: SimpleChange) {
        if (!!change['showModal'].currentValue && !!change['vehicleType']?.currentValue) {
            this.dataForm.setValue({
                title: this.vehicleType.title,
            })
        }
    }

    loadForm() {
        this.dataForm = this.formBuilder.group({
            title: ["", [Validators.required, Validators.min(3), Validators.max(255)]]
        });
    }

    resetAll() {
        this.submitted = false;
        this.closeForm.emit()
        this.dataForm.reset()
    }

    onSubmitData() {
        this.btnloading = true;
        if (this.dataForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.service.submitVehicleType(this.dataForm.value, this.vehicleType?.id || "")
            .then(resp => {
                if (resp.status) {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    this.resetAll()
                    this.eventChange.emit(true)
                } else {
                    this.messageService.add({ severity: 'warning', summary: 'Failed', detail: resp.message, life: 3000 });
                }
            }).catch((e: any) => {
                if (!!e.error && typeof e.error == "string") {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: e.error, life: 3000 });
                } else {
                    console.log(e);
                }
            }).finally(() => {
                this.btnloading = false;
            })
    }
}
