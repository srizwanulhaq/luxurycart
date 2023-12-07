import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Customer_Insurance } from 'src/app/demo/domain/Dao/CustomerInsurance/customer-insurance';
import { CustomerInsuranceMainComponent } from '../customer-insurance-main/customer-insurance-main.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CustomerInsuranceService } from 'src/app/demo/service/customer-insurance.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-customer-insurance-details',
  templateUrl: './customer-insurance-details.component.html',
  styleUrls: ['./customer-insurance-details.component.scss'],
  providers: [MessageService, DatePipe, ConfirmationService],

})
export class CustomerInsuranceDetailsComponent implements OnInit {
  private _details:Customer_Insurance;
  @Output() eventChange = new EventEmitter<Event>();
  @Input() 
  set details(value: Customer_Insurance) {
    if (value) {
      this._details = value;
    }
  }
  @Input()
  set event(event: Event) {
    if (event) {
    }
  }
  get details(): Customer_Insurance {
    return this._details;
  }
  constructor(public main:CustomerInsuranceMainComponent,
    private messageService: MessageService,
    private service:CustomerInsuranceService) { 
    
  }

  ngOnInit(): void {
  }

  ShowRefundStatus(id:string)
  {
    var model ={id:this.details.id};
    this.service.GetStatus(model).pipe(first())
      .subscribe({
          next: (response) => {
              if (response.status) {
                  this.eventChange.emit(response.status);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 5000 });
              } else {
                  this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 5000 });
              }
          },
          error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 5000 });
          },
      });
  }

}
