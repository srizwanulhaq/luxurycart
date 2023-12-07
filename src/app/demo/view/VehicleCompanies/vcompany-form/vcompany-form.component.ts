import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VehicleCompanydao } from 'src/app/demo/domain/Dao/Vehicle/VehicleCompanydao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vcompany-form',
    templateUrl: './vcompany-form.component.html',
    styleUrls: ['./vcompany-form.component.scss']
})
export class VehicleCompanyFormComponent implements OnInit {

    formMode: string
    @Input("vehicleCompany") vehicleCompany: VehicleCompanydao
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
        if (!!change['showModal'].currentValue && !!change['vehicleCompany']?.currentValue) {
            this.dataForm.setValue({
                name: this.vehicleCompany.name
            })
        }
    }

    loadForm() {
        this.dataForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.min(3), Validators.max(255)]]
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
        const template = this.dataForm.value
        this.service.submitVehicleCompany(template, this.vehicleCompany?.id || "")
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
