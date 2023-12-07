import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../../service/customer.service';
import { first } from "rxjs/operators";
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { CustomerMainComponent } from '../customer-main/customer-main.component';

@Component({
  selector: 'app-customer-settle-bonus',
  templateUrl: './customer-settle-bonus.component.html',
  styleUrls: ['./customer-settle-bonus.component.scss']
})
export class CustomerSettleBonusComponent implements OnInit{
 
  customerAddSettleBonusForm: any;
  btnloading: boolean = false;
  bonusAmountVal: number;
  private _details:AdminCustomerListDAO;

  constructor(private _formBuilder: FormBuilder,
    private _customersService: CustomerService,
    private messageService: MessageService,
    public main: CustomerMainComponent) { }
   
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
    this.customerAddSettleBonusForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      bonusSettleAmount: ["", [Validators.required,Validators.pattern('[()0-9]+')]],
    });
  }

  onSubmitCustomerAddSettleBonus() {
    this.btnloading = true;
    if (this.customerAddSettleBonusForm.invalid) {
      this.btnloading = false;
      return;
    }
    var model = {
      id: this.details.id,
      bonusSettleAmount: parseFloat(this.customerAddSettleBonusForm.value.bonusSettleAmount),
    };
    this.addCustomerSettleBonus(model);
  }
  addCustomerSettleBonus(model) {
    if (model.id == undefined || (model.id == null && model.id == "")) {
        this.btnloading = false;
      return;
    } else {
      this._customersService
        .addCustomerSettleBonus(model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            
            if (response.result) {
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.ValuePanelActive = false;
              this.main.bottomPanelActive = false;
              this.btnloading = false;
              this.resetForm();
            } else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
        
          },
          error: (error) => {
            this.main.bottomPanelActive = true;
            this.main.ValuePanelActive = true;
            this.btnloading = false;
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
    }
  }
  resetForm() {
    this.customerAddSettleBonusForm.reset();
  }

}
