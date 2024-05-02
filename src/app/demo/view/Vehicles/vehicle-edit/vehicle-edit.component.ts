import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Vehicles } from 'src/app/demo/domain/Dao/Vehicle/Vehicles';
import { EditVehicleDto } from 'src/app/demo/domain/Dto/Vehicles/EditVehicleDto';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss'],
  providers:[MessageService]
})
export class VehicleEditComponent implements OnInit {

  private _details:Vehicles;
  @Input() editVehicleData: EditVehicleDto;
  editVehicle: EditVehicleDto;
  vehicleEditDialog: boolean;
  submitted: boolean;
  vehicleEditForm;
  btnloading: boolean = false;

  lstCompanies: SelectItem[] = [];
  lstTypes: SelectItem[] = [];
  lstStatuses: SelectItem[] = [];
  lstModels: SelectItem[] = [];
  lstIOT: SelectItem[] = [];
  lstAccounts: SelectItem[] = [];
  project:ProjectDropDown[];
  @Output() eventChange = new EventEmitter<Event>();

  constructor(public main: VehicleMainComponent,
              private _formBuilder: FormBuilder,
              private service: VehicleService,
              private messageService: MessageService,
              private zoneService:ZoneService
             ) { 

                this.loadForm();
                this.loadDropdownValues();
              }

  ngOnInit(): void {
 
  }

  @Output() resetEditVehData = new EventEmitter<null>(); 

  ngOnChanges(change: SimpleChange) {
    if (!!change['editVehicleData'].currentValue) {
        const temp = change['editVehicleData'].currentValue;
        this.lstIOT.push({label: temp.iot.imei, value:  temp.iot.id});
        const group: FormGroup = this.vehicleEditForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['number'].setValue(temp.number || "");
        //group.controls['vehicleStatusId'].setValue(temp.vehicleStatus.id || "");
        //group.controls['vehicleCompanyId'].setValue(temp.vehicleCompany.id || "" );
        group.controls['vehicleTypeId'].setValue(temp.vehicleTypes.id || "" );
        group.controls['serial_No'].setValue(temp.serial_No || "" );
        group.controls['project_Id'].setValue(temp.project.id || "" );
        //group.controls['vehicleModelId'].setValue(temp.vehicleModel.id || "" );
        group.controls['IOT_Id'].setValue(temp.iot.id || "" );
        //group.controls['vehicleBattery'].setValue(temp.vehicleBattery || 0 );
        //group.controls['subAccountId'].setValue(temp.subAccount.id || "" );
        
        
    }
  }
  
  // @Input() 
  // set details(value: Vehicles) {
  //   console.log(value);
  //   if (value) {
  //     this._details = value;

  //   }
  // }

  // get details(): Vehicles {
  //   return this._details;
  // }

  loadForm() {
    this.vehicleEditForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      number: ["", [Validators.required , Validators.pattern('[()0-9]+')]],
      //vehicleStatusId: ["", [Validators.required]],
      //vehicleCompanyId: ["", [Validators.required]],
      vehicleTypeId: ["", [Validators.required]],
      //vehicleModelId: ["", [Validators.required]],
      IOT_Id: ["", [Validators.required]],
      //subAccountId: ["", [Validators.required]],
      //vehicleBattery: ["", [Validators.required,Validators.max(100), Validators.min(0)]],
      serial_No: ["", [Validators.required, Validators.max(17), Validators.min(15)]],
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
      //this.lstCompanies = responseList.lstCompanies;
      //this.lstAccounts = responseList.lstAccounts;
      this.lstIOT = responseList.lstIOTs;
      //this.lstModels = responseList.lstModels;
      //this.lstStatuses = responseList.lstStatuses;
      this.lstTypes = responseList.lstTypes;

      
    });
  // }).then(()=>this.setValues());
  }

  // setValues() {
  //   console.log(this.details);
  //   if(this.details){
  //     this.lstIOT.push({label: this.details.iot.imei, value:  this.details.iot.id});
  //     this.vehicleEditForm.controls.id.setValue(this.details.id);
  //     this.vehicleEditForm.controls.number.setValue(this.details.number);
  //     this.vehicleEditForm.controls.vehicleBattery.setValue(this.details.vehicleBattery);
  //     this.vehicleEditForm.controls.IOT_Id.setValue(this.details.iot.id);
  //     this.vehicleEditForm.controls.subAccountId.setValue(this.details.subAccount.id);
  //     this.vehicleEditForm.controls.vehicleStatusId.setValue(this.details.vehicleStatus.id);
  //     this.vehicleEditForm.controls.vehicleModelId.setValue(this.details.vehicleModel.id);
  //     this.vehicleEditForm.controls.vehicleCompanyId.setValue(this.details.vehicleCompany.id);
  //     this.vehicleEditForm.controls.vehicleTypeId.setValue(this.details.vehicleTypes.id);
  //   }
  // }

  onSubmitForm(){
    this.btnloading = true;
    if (this.vehicleEditForm.invalid) {
      this.btnloading = false;
      return;
    }
   
    this.updateVehicle(this.vehicleEditForm.value);
  }

  updateVehicle(vehicle: EditVehicleDto) {
    this.service.updateVehicle(vehicle).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.vehicleEditDialog = false;
            this.main.editPanelActive = false;
            this.main.bottomPanelActive = false;
            if (response.status) {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              
            }else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
          },
          error: (error) => {
            this.btnloading = false;
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
  }
  resetForm() {
    this.vehicleEditForm.reset();
    this.btnloading = false;
  }


}
