import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TourCustomerPurchase } from 'src/app/demo/domain/Dao/Tours/tour-customer-purchase';
import { TourCustomerPurchaseMainComponent } from '../tour-customer-purchase-main/tour-customer-purchase-main.component';
import { TourCustomerPurchaseService } from 'src/app/demo/service/tour-customer-purchase.service';

@Component({
  selector: 'app-tour-customer-purchase-details',
  templateUrl: './tour-customer-purchase-details.component.html',
  styleUrls: ['./tour-customer-purchase-details.component.scss'],
  providers:[MessageService]
 
})
export class TourCustomerPurchaseDetailsComponent implements OnInit {

  private _details: TourCustomerPurchase;
  constructor( public main: TourCustomerPurchaseMainComponent,
               private service: TourCustomerPurchaseService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
  set details(value: TourCustomerPurchase) {
      if (value) {
          this._details = value;
      }

  }

  get details(): TourCustomerPurchase {
      return this._details;
  }

  // onStatus(e, id) {
  //   var active = e.checked;
  //   this.confirmService.confirm({
  //     message: "Do you want to change status?",
  //     header: "Change Confirmation",
  //     icon: "pi pi-info-circle",
  //     accept: () => {
  //       //-------------------------------------
  //       var model = {
  //         id: id,
  //         active: active,
  //       };
  //       this.service
  //         .changeStatus(model)
  //         .pipe(first())
  //         .subscribe({
  //           next: (response) => {
  //             this.eventChange.emit(response.status);
  //             this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
  //             this.main.bottomPanelActive = false;
  //           },
  //           error: (error) => {
  //               this.main.bottomPanelActive = true;
  //               this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
  //           },
  //         });
   
  //     },
  //     reject: () => {
  //       this.details.active = !active;
  //     },
  //   });
  // }
}
