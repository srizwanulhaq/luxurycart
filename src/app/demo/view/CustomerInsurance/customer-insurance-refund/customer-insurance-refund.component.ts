import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { CustomerInsuranceMainComponent } from '../customer-insurance-main/customer-insurance-main.component';
import { MessageService } from 'primeng/api';
import { Customer_Insurance } from 'src/app/demo/domain/Dao/CustomerInsurance/customer-insurance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerInsuranceService } from 'src/app/demo/service/customer-insurance.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-customer-insurance-refund',
  templateUrl: './customer-insurance-refund.component.html',
  styleUrls: ['./customer-insurance-refund.component.scss']
})
export class CustomerInsuranceRefundComponent implements OnInit {

  private _details:Customer_Insurance=new Customer_Insurance();
  visible: boolean = false;
  refundForm:FormGroup;
  
  @Output() eventChange = new EventEmitter<Event>();
  @Input() 
  set details(value: Customer_Insurance) {
    if (value) {
      this._details = value;
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
    this.refundForm = new FormGroup({
      refund_Amount: new FormControl(this._details.refund_Amount,[Validators.required,Validators.max(this.details.final_Amount),Validators.min(1)]),
      id: new FormControl(this.details.id)
    });
  }

  Submit()
  {
    if(this.refundForm.controls["refund_Amount"].value<=this.details.final_Amount)
    {
      
      this.Refund(this.refundForm.value)
    }
    else
    {
      this.messageService.add({ severity: 'warning', summary: 'Failed', detail: "Refund Amount Should be less than or equals to Final Amounr", life: 3000 });
    }
  }

  Refund(form:any)
  {
    this.service.Refund(form).pipe(first())
      .subscribe({
          next: (response) => {
              this.refundForm.reset();
              this.main.RefundDialogActive = false;
              if (response.status) {
                  this.eventChange.emit(response.status);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
              } else {
                  this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
              }
          },
          error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
          },
      });
  }
 
}
