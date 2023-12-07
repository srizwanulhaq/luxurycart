import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { SendSingleAlert } from 'src/app/demo/domain/Dao/Customers/customer-alert';
import { EditCustomerdto } from 'src/app/demo/domain/Dto/Customers/EditCustomerdto';
@Component({
  selector: 'app-customer',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
  providers: [MessageService, DatePipe,ConfirmationService],
})
export class CustomerMainComponent implements OnInit {
  
  EditCustomerData:EditCustomerdto =null;
  SendSingleAlert: SendSingleAlert = null;
   customerId:any;
  customerIdForDelete:any;
  customerStatusNumber:any;
  customerCode:any;
  global_Status: any;
  FormType:any;


  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  addPanelClick: boolean;
  addPanelActive: boolean;
  editPanelClick: boolean;
  editPanelActive: boolean;
  ValuePanelClick: boolean;
  ValuePanelActive: boolean;
  AlertPanelClick: boolean;
  AlertPanelActive: boolean;
  customer: AdminCustomerListDAO;
  event: Event;

  constructor() { }

  ngOnInit(): void {
  }
  
  addValue(CusId,formType){
    this.customerId = CusId;
    this.FormType = formType;
    this.event = null;
    this.ValuePanelClick = true;
    this.ValuePanelActive = !this.ValuePanelActive;
  }  
  onBottomPanelButtonClick(event, customer) {
    this.customer = customer;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onBottomPanelClick() {
    this.bottomPanelClick = true;
  }

  onChange(event){
    this.event = event;
  }
  showCustomerRegForm() {
    this.event = null
    this.addPanelClick = true;
    this.addPanelActive = !this.addPanelActive;
  }

  onEditPanelButtonClick(event, EditCustomerData: EditCustomerdto){

    this.EditCustomerData = EditCustomerData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
   showAlertForm(event,SendSingleAlert:SendSingleAlert){
    
    this.SendSingleAlert = SendSingleAlert;
    this.AlertPanelClick = true;
    this.AlertPanelActive = !this.AlertPanelActive;
    event.preventDefault();
    this.event = null;
   }
}
