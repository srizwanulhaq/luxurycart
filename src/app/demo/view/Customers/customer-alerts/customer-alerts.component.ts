import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SendSingleAlert } from 'src/app/demo/domain/Dao/Customers/customer-alert';
import { CustomerAlertService } from 'src/app/demo/service/customer-alert.service';
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { first} from "rxjs/operators";

@Component({
  selector: 'app-customer-alerts',
  templateUrl: './customer-alerts.component.html',
  styleUrls: ['./customer-alerts.component.scss']
})
export class CustomerAlertsComponent implements OnInit {

  private _details: SendSingleAlert;
  sendCustomersAlertdao: SendSingleAlert;
  sendIndividualAlertForm:FormGroup;
  sendNewCustomerAlertshow: boolean = false;
  btnloading:boolean = false;
  itemCustomersAlert: any = [];
  selectedCustomersAlert: any = [];
  submitted:boolean;
 
  
  constructor(
    private messageService: MessageService,
    public main: CustomerMainComponent,
    private AlertService:CustomerAlertService) { }

  ngOnInit(): void {
    this.sendIndividualAlertForm = new FormGroup({
      id: new FormControl(""),
      customers: new FormControl("", [Validators.required]),
      eng_Message: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
     // arabic_Message: new FormControl("", [Validators.required,]),

    });
  } 

  @Output() eventChange = new EventEmitter<Event>();
   @Input() 
   set details(value: SendSingleAlert) {
     if (value) {
       this._details = value;
       var _itemCustomersAlert = [];
       _itemCustomersAlert.push(this.details.id);
      this.itemCustomersAlert = _itemCustomersAlert;
      this.selectedCustomersAlert = this.itemCustomersAlert;
     }
   }
 
   get details(): SendSingleAlert { 
    return this._details;
     
   }
 
  onSubmitIndividualAlertForm() {
    this.main.event = null;
    this.btnloading = true;
    this.submitted = true;
    if (this.sendIndividualAlertForm.invalid) {
      this.btnloading = false;
      return;
    }
     this.sendCustomersAlertdao = this.sendIndividualAlertForm.value;
     this.onSendAlert(this.sendCustomersAlertdao);
  }
  onSendAlert(sendCustomersAlertdao: SendSingleAlert) {
    this.btnloading = true;
    this.AlertService
    .sendCustomersAlert(sendCustomersAlertdao)
    .pipe(first())
    .subscribe({
      next: (response) => {
        if (response.result) {
          this.eventChange.emit(response.result);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
          this.main.AlertPanelActive = false;
          this.submitted = false;
          this.resetForm();
        } else {
          this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
          this.btnloading = false;
          this.main.AlertPanelActive = true;
        }
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
        this.btnloading = false;
        this.main.AlertPanelActive = true;
      },
    });
  
  }
  resetForm(){
    this.sendIndividualAlertForm.reset();
  }
}

