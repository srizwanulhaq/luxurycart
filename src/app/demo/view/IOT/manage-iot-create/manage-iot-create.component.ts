import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageIotService } from 'src/app/demo/service/manage-iot.service';
import { first } from "rxjs/operators";
import { MessageService, SelectItem } from 'primeng/api';
import { NewIotDto } from 'src/app/demo/domain/Dto/IOT/new-iot-dto';
import { IotDAO } from 'src/app/demo/domain/Dao/IOT/IOTdao';
import { ManageIotMainComponent } from '../manage-iot-main/manage-iot-main.component';


@Component({
  selector: 'app-manage-iot-create',
  templateUrl: './manage-iot-create.component.html',
  styleUrls: ['./manage-iot-create.component.scss']
})
export class ManageIotCreateComponent implements OnInit {


  iotDtoes: NewIotDto;
  saveManageIotForm: any;
  addnewManageIotshow: boolean;
  btnloading: boolean = false;
  submitted:boolean =false;
  selectedIotManageChks: any[] = [];
  IotManageChk: any[] = [
    { name: "Integrated", key: "I" },
    { name: "Allow TCP commands", key: "A" }
  ];
  _itemSubaccount = [];
  _itemIotModel = [];
  _itemSubaccountVal: number;
  _itemIotModelVal: string;
  _iotDAO: IotDAO;
  imeiVal: string;
  phonePrefixVal: string;
  phoneVal: string;
  batteryVal: string;
  notesVal: string;
  customIdVal: string;

  lstModels: SelectItem[] = [];
  lstAccounts: SelectItem[] = [];
  iotDialog:boolean;
  showPasswaord: boolean = false;



  constructor(private _manageIotService: ManageIotService,
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    public main: ManageIotMainComponent) 
    {
       this.loadDropdownValues();
    }

    @Output() eventChange = new EventEmitter<Event>();
    
  ngOnInit(): void {

   
    this.saveManageIotForm = this._formBuilder.group({
      iot_Id: [''],
      imei: ['', [Validators.required ,Validators.pattern('^[0-9]{15}$')]],
      battery: [0,[Validators.max(100), Validators.min(0)]],
      subAccount: ['', [Validators.required]],
      iotModel: ['', [Validators.required]],
      password:[''],
      device_Id:[0] 
    });

  }
  loadDropdownValues() {
    // models,and sub-accounts
    this._manageIotService.requestDataFromMultipleSources().then(responseList => {
      this.lstAccounts = responseList.lstAccounts;
      this.lstModels = responseList.lstModels;
    });
  }
  resetForm() {
    this.saveManageIotForm.reset();
    this.btnloading = false;
  }
  changeModel(e){
    if(e.value == 'b26914b7-ddab-11ec-9d99-065837c3e1de')
      this.showPasswaord = true;

    else 
    this.showPasswaord = false;
  }
  onSubmitManageIotForm() {

    this.btnloading = true;
    if (this.saveManageIotForm.invalid) {
      this.btnloading = false;
      return;
    }
  
    this.iotDtoes = this.saveManageIotForm.value;
    this.SaveManageIotData(this.iotDtoes);
  }
  SaveManageIotData(iotDtoes: NewIotDto) {

    iotDtoes.integrated = null;
    iotDtoes.allowTCPCommands = null;
    if (this.selectedIotManageChks != null) {
      this.selectedIotManageChks.forEach(function (item_chk) {
        if (item_chk.key == "I") iotDtoes.integrated = item_chk.name;
        else if (item_chk.key == "A") iotDtoes.allowTCPCommands = item_chk.name;
      });
    }
      iotDtoes.battery = iotDtoes.battery == null ? 0 : iotDtoes.battery;
      iotDtoes.device_Id = iotDtoes.device_Id == null ? 0 : iotDtoes.device_Id;
      
     
      // iotDtoes.phone = iotDtoes.phone == " " ? null : iotDtoes.phone.trim();
      // iotDtoes.phonePrefix = iotDtoes.phonePrefix == " " ? null : iotDtoes.phonePrefix.trim();
      
      this._manageIotService.saveManageIotData(iotDtoes).pipe(first()).subscribe({
        next: response => {

          if (response.result) {

            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.resetForm();
            this.iotDialog = false;
          } else {
           
            this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            this.iotDialog = false;
            this.btnloading = false;
          }
        },
        error: error => {
          this.iotDialog = true;
          this.btnloading = false;
          this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000}); 
        }
      });
    }

    openNew() {
   
      this.submitted = false;
      this.iotDialog = true;
      this.main.event = null;
      this.showPasswaord = false;
      this.resetForm();
      this.setDefualtValue();
      this.loadDropdownValues();
    }
    setDefualtValue(){
      const group: FormGroup = this.saveManageIotForm as FormGroup;
      group.controls['battery'].setValue(0);
      // group.controls['phone'].setValue(" ");
      // group.controls['phonePrefix'].setValue(" ");
    }
  }

