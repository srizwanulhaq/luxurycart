import { Component, OnInit } from '@angular/core';
import { TourCustomerPurchase } from 'src/app/demo/domain/Dao/Tours/tour-customer-purchase';

@Component({
  selector: 'app-tour-customer-purchase-main',
  templateUrl: './tour-customer-purchase-main.component.html',
  styleUrls: ['./tour-customer-purchase-main.component.scss']
})
export class TourCustomerPurchaseMainComponent implements OnInit {

  event: Event;
  purchases:TourCustomerPurchase;
  // editPanelClick: boolean;
  // editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  // onEditPanelButtonClick(event, EditPointData: Points){

  //   this.point = EditPointData
  //   this.editPanelClick = true;
  //   this.editPanelActive = !this.editPanelActive;
  //   event.preventDefault();
  //   this.event = null;
  //  }
  onBottomPanelButtonClick(event,purchase:TourCustomerPurchase){
    this.purchases = purchase;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
