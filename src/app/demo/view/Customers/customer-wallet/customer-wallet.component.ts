import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CustomerService } from '../../../service/customer.service';
import { first } from "rxjs/operators";
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { AdminCustomerGLBLoad2 } from 'src/app/demo/domain/Dao/Customers/customer-bonus';
import { CustomerMainComponent } from '../customer-main/customer-main.component';

@Component({
  selector: 'app-customer-wallet',
  templateUrl: './customer-wallet.component.html',
  styleUrls: ['./customer-wallet.component.scss'],
  providers:[MessageService, ConfirmationService],
})
export class CustomerWalletComponent implements OnInit {

  loading: boolean = false;
  customerAddWalletForm: any;
  btnloading: boolean = false;
  walletAmountVal: number;
  private _details:AdminCustomerListDAO;
  loadTransactionMode: AdminCustomerGLBLoad2;
  transactionModeOptions: any = [];
  walletPackageOptions: any = [];
  

  formNo:number = 1;

  constructor(private _formBuilder: FormBuilder,
    private _customersService: CustomerService,
    private messageService: MessageService,
    public main: CustomerMainComponent) { 
      
    }

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
    this.customerAddWalletForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      walletAmount: ["", [Validators.pattern('[()0-9]+')]],
      transactionModeId: ["", [Validators.required]],
      walletPackageId: [],
      reason:[],
    });
  }
  onSubmitCustomerAddWallet() {
    this.btnloading = true;
    if (this.customerAddWalletForm.invalid) {
      this.btnloading = false;
      return;
    }
    
    var model = { };
    if(this.formNo == 1){
      model = {
        id: this.details.id,
        walletAmount: 0,
        transactionModeId: this.customerAddWalletForm.value.transactionModeId,
        walletPackageId: this.customerAddWalletForm.value.walletPackageId,
        reason: null,
      };
    } 
    else{
       model = {
        id: this.details.id,
        walletAmount: parseFloat(this.customerAddWalletForm.value.walletAmount),
        transactionModeId: this.customerAddWalletForm.value.transactionModeId,
        walletPackageId:null,
        reason: this.customerAddWalletForm.value.reason,
      };
    }

    this.addCustomerWallet(model);
  }

  addCustomerWallet(model) {
    if (model.id == undefined || (model.id == null && model.id == "")) {
      this.btnloading = false;
      return;
    } else {
      this._customersService
        .addCustomerWallet(model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.eventChange.emit(response.status);
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
            this.main.ValuePanelActive = true;
            this.main.bottomPanelActive = true;
            this.btnloading = false;
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
    }
  }
  resetForm() {
    this.customerAddWalletForm.reset();
  }
  getTransactionModesLoad() {
    this._customersService.getTransactionModesLoad().subscribe((response) => {
      this.loadTransactionMode = response.data;
      var _itemParkingZones: any = [];
      this.loadTransactionMode.transaction_Modes.forEach(function (item) {
        _itemParkingZones.push({ label: item.title, value: item.id });
      });
      this.transactionModeOptions = _itemParkingZones;

      var _itemWalletPackage: any = [];
      this.loadTransactionMode.wallet_Packages.forEach(function (item) {
        _itemWalletPackage.push({ label: (item.title + " " + "TopUp Amount" + " " + item.top_Up_Amount + " " + "Bonus Amount" + " "+ item.bonus_Amount), value: item.id });
      });
      this.walletPackageOptions = _itemWalletPackage;


    });
  }
    formChanged(e) {
      this.formNo = e.index + 1;
    }
}
