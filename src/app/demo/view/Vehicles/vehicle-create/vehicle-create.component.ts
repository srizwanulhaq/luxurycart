import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewVehicleDto } from 'src/app/demo/domain/Dto/Vehicles/NewVehicleDto';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';

@Component({
    selector: 'app-vehicle-create',
    templateUrl: './vehicle-create.component.html',
    styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit {

    vehicle: NewVehicleDto;
    vehicleDialog: boolean;
    submitted: boolean;
    vehicleForm;
    btnloading: boolean = false;
    @Output() eventChange = new EventEmitter<Event>();
    @Input("selectedVehiclesCount") vehiclesCount: number;

    lstCompanies: SelectItem[] = [];
    lstTypes: SelectItem[] = [];
    lstStatuses: SelectItem[] = [];
    lstModels: SelectItem[] = [];
    lstIOT: SelectItem[] = [];
    lstAccounts: SelectItem[] = [];

    vehicleCompanyId: string;
    vehicleTypeId: string;
    vehicleStatusId: string;
    vehicleModelId: string;
    subAccountId: string;
    IOT_Id: string;
    project:ProjectDropDown[];
    constructor(private _formBuilder: FormBuilder,
        private service: VehicleService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef,
        private main: VehicleMainComponent,
        private zoneService:ZoneService) { }

    ngOnInit(): void {

        this.loadForm();
    }

    loadForm() {
        this.vehicleForm = this._formBuilder.group({
            number: ["", [Validators.required, Validators.pattern('[()0-9]+')]],
            //vehicleStatusId: ["", [Validators.required]],
            //vehicleCompanyId: ["", [Validators.required]],
            vehicleTypeId: ["", [Validators.required]],
            
            //vehicleModelId: ["", [Validators.required]],
            IOT_Id: ["", [Validators.required]],
            //subAccountId: ["", [Validators.required]],
            //vehicleBattery: ["", [Validators.required, Validators.max(100), Validators.min(0)]],
            serial_No: [, [Validators.required, Validators.maxLength(17), Validators.minLength(15)]],
            project_Id:[""],
        });
    }

    loadDropdownValues() {
        //load company, types, status, models, iot, and sub-accounts
        this.zoneService.getProjectDropdowns().then(resp => {
            if (resp) {
                this.project = resp;
            }});
        this.service.requestDataFromMultipleSources().then(responseList => {

            // this.lstCompanies = responseList.lstCompanies;
            // this.lstAccounts = responseList.lstAccounts;
             this.lstIOT = responseList.lstIOTs;
            // this.lstModels = responseList.lstModels;
            // this.lstStatuses = responseList.lstStatuses;
            this.lstTypes = responseList.lstTypes;
        });
    }

    openNew() {
        this.vehicle = {};
        this.submitted = false;
        this.vehicleDialog = true;
        this.main.event = null;
        this.resetForm();
        //this.setDefaultValue();
        this.loadDropdownValues();
    }
    // setDefaultValue() {
    //     const group: FormGroup = this.vehicleForm as FormGroup;
    //     group.controls['vehicleBattery'].setValue(0);
    // }

    hideDialog() {
        this.vehicleDialog = false;
    }

    onSubmitForm() {
        this.btnloading = true;
        if (this.vehicleForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.addNewVehicle(this.vehicleForm.value);
    }

    addNewVehicle(vehicle: NewVehicleDto) {

        this.service.saveVehicle(vehicle).pipe(first())
            .subscribe({
                next: (response) => {
                    this.resetForm();
                    this.vehicleDialog = false;
                    if (response.status) {
                        this.eventChange.emit(response.status);
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
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

}
