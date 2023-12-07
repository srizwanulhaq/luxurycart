import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer_Insurance } from 'src/app/demo/domain/Dao/CustomerInsurance/customer-insurance';

@Component({
  selector: 'app-customer-insurance-main',
  templateUrl: './customer-insurance-main.component.html',
  styleUrls: ['./customer-insurance-main.component.scss'],
  providers: [MessageService, DatePipe,ConfirmationService]
})
export class CustomerInsuranceMainComponent implements OnInit {

  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  RefundDialogClick: boolean;
  RefundDialogActive: boolean;
  customer_insurance: Customer_Insurance;
  event: Event;
  
  constructor() { }

  ngOnInit(): void {
  }

  onBottomPanelButtonClick(event, insurance) {
    this.customer_insurance = insurance;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onBottomPanelClick() {
    this.bottomPanelClick = true;
  }
  onRefundDialogButtonClick(event, insurance) {
    this.customer_insurance = insurance;
    this.RefundDialogClick = true;
    this.RefundDialogActive = !this.RefundDialogActive;
  }
  onRefundDialogClick() {
    this.RefundDialogClick = true;
  }
  onChange(event){
    this.event = event;
  }
}
