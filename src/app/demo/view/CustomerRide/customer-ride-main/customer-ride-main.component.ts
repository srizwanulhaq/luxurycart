import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { TransactionModedao, WalletPackagesDao } from 'src/app/demo/domain/Dao/Customers/customer-bonus';
import { Vehicledao } from 'src/app/demo/domain/Dao/Vehicle/Vehicledao';
import { AddCustomerRide } from 'src/app/demo/domain/Dto/CustomerRides/add-customer-ride';
import { CustomerRideService } from 'src/app/demo/service/customer-ride.service';

@Component({
  selector: 'app-customer-ride-main',
  templateUrl: './customer-ride-main.component.html',
  styleUrls: ['./customer-ride-main.component.scss']
})
export class CustomerRideMainComponent implements OnInit {

  customerRide:AddCustomerRide;
  customerRideForm: FormGroup;
  addNewCustomerRide: boolean = false;
  regsubmitted = false;
  btnloading: boolean = false;

  list_vehicle:SelectItem[]=[];
  list_transaction_mode:SelectItem[]=[];
  list_wallet_package:SelectItem[]=[];
  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.SaudiArabia, CountryISO.Pakistan];
	
  constructor(private _formBuilder: FormBuilder,
    private service: CustomerRideService,
    private messageService: MessageService
    )
     {
      
    }
     
     @Output() eventChange = new EventEmitter<Event>();

  ngOnInit(): void {
    this.customerRideForm = this._formBuilder.group({
      fullName: [""],
      email: [""],
      phoneNumber : new FormControl(undefined, [Validators.required]),
      vehicleId :["",[Validators.required]],
      walletPackageId :["",[Validators.required]],
      transactionModeId :["",[Validators.required]]
    });
    this.loadDropdownValues();
  }
  phoneInvalid:boolean = false;
  onKeypressPhone(){
      this.phoneInvalid = this.customerRideForm.controls['phoneNumber'].invalid;
      this.btnloading = false;
      return;
  }
  onKeyUpPhone(){
      this.phoneInvalid = this.customerRideForm.controls['phoneNumber'].invalid;
      this.btnloading = false;
      return;
  }

  onSubmitCustomerReg() {
    this.btnloading = true;
    // if (this.customerRegisterForm.invalid) {
    //   this.btnloading = false;
    //   return;
    // }

  console.log(this.customerRideForm.value)

  var model = {
    fullName: this.customerRideForm.value.fullName,
    email: this.customerRideForm.value.email,
    phoneNumber: this.customerRideForm.value.phoneNumber.e164Number,
    vehicleId:this.customerRideForm.value.vehicleId,
    walletPackageId:this.customerRideForm.value.walletPackageId,
    transactionModeId:this.customerRideForm.value.transactionModeId,

  };


    this.service.save(model)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.eventChange.emit(response.status);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});

            this.btnloading = false;
            this.resetForm();
          } else {
            this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});

            this.btnloading = false;
          }
        },
        error: (error) => {
          this.btnloading = false;
          this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
        },
      });
  }


  loadDropdownValues() {
    //load company, types, status, models, iot, and sub-accounts
    
    this.service.getVehicles().subscribe(responseList => {
      responseList.data.forEach(element => {
        this.list_vehicle.push({ label: element.number, value: element.id });
      });
    });
    this.service.getTransactionModesLoad().subscribe(responseList => {
      //this.list_transaction_mode = responseList.data.transaction_Modes;
    //  console.log(responseList.data.transaction_Modes);
    //  console.log(responseList.data.wallet_Packages)
      
      responseList.data.transaction_Modes.forEach(element => {
        this.list_transaction_mode.push({ label: element.title, value: element.id });
      });
      responseList.data.wallet_Packages.forEach(element => {
        this.list_wallet_package.push({ label: element.title, value: element.id });
      });
      
    });
  }
  resetForm() {
    this.regsubmitted = false;
    this.customerRideForm.reset();
  }
}
