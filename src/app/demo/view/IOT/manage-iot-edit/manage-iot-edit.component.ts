import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { first } from "rxjs/operators";
import { MessageService, SelectItem } from 'primeng/api';
import { ManageIotService } from 'src/app/demo/service/manage-iot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IotDAO} from 'src/app/demo/domain/Dao/IOT/IOTdao';
import { EditIotDto } from 'src/app/demo/domain/Dto/IOT/new-iot-dto';
import { ManageIotMainComponent } from '../manage-iot-main/manage-iot-main.component';

@Component({
  selector: 'app-manage-iot-edit',
  templateUrl: './manage-iot-edit.component.html',
  styleUrls: ['./manage-iot-edit.component.scss']
})
export class ManageIotEditComponent implements OnInit {

  @Input() editIotData: EditIotDto;
  updateManageIotForm: any;
  updatManageIotshow: boolean;
  btnloading: boolean = false;
  submitted:boolean =false;

  lstModels: SelectItem[] = [];
  lstAccounts: SelectItem[] = [];
  
  constructor(private _manageIotService: ManageIotService,
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    public main: ManageIotMainComponent) {
      this.loadDropdownValues();
    }
    
    @Output() eventChange = new EventEmitter<Event>();
    @Output() resetEditIotData = new EventEmitter<null>();
    
  ngOnInit(): void {
    this.updateManageIotForm = this._formBuilder.group({
      imei: ['', [Validators.required ,Validators.pattern('^[0-9]{15}$')]],
      battery: ['' ,[Validators.required,Validators.max(100), Validators.min(0)]],
      subAccount: ['', [Validators.required]],
      iotModel: ['', [Validators.required]],
      device_Id:[],
    });

  }
  ngOnChanges(change: SimpleChange) {
    if (!!change['editIotData'].currentValue) {
        const temp = change['editIotData'].currentValue
        const group: FormGroup = this.updateManageIotForm as FormGroup;
        group.controls['imei'].setValue(temp.imei || "");
        group.controls['battery'].setValue(temp.battery || 0);
        group.controls['iotModel'].setValue(temp.iotModels.id || "" );
        group.controls['subAccount'].setValue(temp.sub_Accounts.id || "" );
        group.controls['device_Id'].setValue(temp.device_Id || 0 );
        
    }
}
  onSubmitManageIotForm() {
    this.btnloading = true;
    if (this.updateManageIotForm.invalid) {
      this.btnloading = false;
      return;
    }
    this._manageIotService.updateManageIotData({
      iot_Id: this.editIotData.id, 
      imei:  this.updateManageIotForm.value.imei,
      battery:  this.updateManageIotForm.value.battery,
      iotModel:this.updateManageIotForm.value.iotModel,
      subAccount:this.updateManageIotForm.value.subAccount,
      device_Id:this.updateManageIotForm.value.device_Id,

    }).pipe(first()).subscribe({
      next: response => {
        if (response.result) { 
          this.eventChange.emit(response.result);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
          this.main.editPanelActive =false
          this.main.bottomPanelActive = false;
          this.btnloading = false;  
          this.resetForm(); 
        }
        else 
          {
          this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
          this.btnloading = false;
          this.main.editPanelActive =true;
          }
      },
      error: error => {
        this.main.editPanelActive =true;
        this.btnloading = false;
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000}); 
      }
    });
  }

  loadDropdownValues() {
    // models,and sub-accounts
    this._manageIotService.requestDataFromMultipleSources().then(responseList => {
      this.lstAccounts = responseList.lstAccounts;
      this.lstModels = responseList.lstModels;
    });
  }
   showEditForm() {
    this.resetForm();
    this.updatManageIotshow = true;
    this.btnloading = false;
    }
    resetForm() {
      this.updateManageIotForm.reset();
      this.btnloading = false;
    }
}

