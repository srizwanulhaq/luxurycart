import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../../service/customer.service';
import { first } from "rxjs/operators";
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';

@Component({
  selector: 'app-customer-charge',
  templateUrl: './customer-charge.component.html',
  styleUrls: ['./customer-charge.component.scss']
})
export class CustomerChargeComponent implements OnInit {
  
  customerChargeForm: any;
  btnloading: boolean = false;
  chargeAmountVal:any;
  private _details:AdminCustomerListDAO;

  constructor(private _formBuilder: FormBuilder,
    private _customersService: CustomerService,
    private messageService: MessageService,
    public main: CustomerMainComponent,
    ) { }
    
    @Output() eventChange = new EventEmitter<Event>();
    
    @Input() 
  set details(value: AdminCustomerListDAO) {
    if (value) {
      this._details = value;
    }
  }

  get details(): AdminCustomerListDAO {
    return this._details;
  }

  ngOnInit(): void {
    this.customerChargeForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      chargeAmount: ["", [Validators.required,Validators.pattern('[()0-9]+')]],
    });
  }
 

  onSubmitCustomerCharge() {
    this.btnloading = true;
    if (this.customerChargeForm.invalid) {
      this.btnloading = false;
      return;
    }
    var model = {
      id: this.details.id,
      chargeAmount: parseFloat(this.customerChargeForm.value.chargeAmount),
    };
    this.updateCustomerCharge(model);
    
  }
  updateCustomerCharge(model) {
    if (model.id == undefined || (model.id == null && model.id == "")) {
      this.btnloading = false;
      return;
    } else {
      this._customersService
        .updateCustomerCharge(model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            
            if (response.result) {
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.btnloading = false;
              this.main.ValuePanelActive = false;
              this.main.bottomPanelActive = false;
              this.resetForm();
            } else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
          },
          error: (error) => {
              this.btnloading = false;
              this.main.ValuePanelActive = true;
              this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
    }
    
  }

  resetForm() {
    this.customerChargeForm.reset();
  }


}
