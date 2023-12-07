

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../../service/customer.service';
import { first } from "rxjs/operators";
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { AdminCustomerGLBLoad2 } from 'src/app/demo/domain/Dao/Customers/customer-bonus';


@Component({
  selector: 'app-customer-bonus',
  templateUrl: './customer-bonus.component.html',
  styleUrls: ['./customer-bonus.component.scss']
})
export class CustomerBonusComponent implements OnInit {

  customerId:string;
  customerAddBonusForm: any;
  btnloading: boolean = false;
  private _details:AdminCustomerListDAO;
  loadTransactionMode: AdminCustomerGLBLoad2;
  bonusTypesOptions:any = [];
  isReasonShown: boolean = false;


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
    this.getTransactionModesLoad();
    this.customerAddBonusForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      bonusAmount: ["", [Validators.required,Validators.pattern('[()0-9]+')]],
      bonusTypeId: ["", [Validators.required]],
      bonusReason: ["",[]],
    });
    
  }
  onSubmitCustomerAddBonus() {
    this.btnloading = true;
    if (this.customerAddBonusForm.invalid) {
      this.btnloading = false;
      return;
    }
    var model = {
      id: this.details.id,
      bonusAmount: parseFloat(this.customerAddBonusForm.value.bonusAmount),
      bonusTypeId: this.customerAddBonusForm.value.bonusTypeId,
      bonusReason: this.customerAddBonusForm.value.bonusReason
    };
    this.addCustomerBonus(model);
  }

  addCustomerBonus(model) {
    if (model.id == undefined || (model.id == null && model.id == "")) {
      this.btnloading = false;
      return;
    } else {
      this._customersService
        .addCustomerBonus(model)
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
            this.main.ValuePanelActive = true;
            this.main.bottomPanelActive = true;
            this.btnloading = false;
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
    }
  }
  resetForm() {
    this.customerAddBonusForm.reset();
    this.isReasonShown = false;
  }

  
  
  getTransactionModesLoad() {
    this._customersService.getTransactionModesLoad().subscribe((response) => {
      this.loadTransactionMode = response.data;
      this.bonusTypesOptions = [];
      this.loadTransactionMode.bonus_Types.forEach(element=> {
        this.bonusTypesOptions.push({ label: element.title, value: element.id });
      });
    });
  }
  changeReasonStatus(event){
    if(event.value == this.loadTransactionMode.bonus_Types.find(element => {
      return element.number == 9}).id){
        this.isReasonShown = ! this.isReasonShown;
      }
      else{
      this.isReasonShown = false;}
  }

}
