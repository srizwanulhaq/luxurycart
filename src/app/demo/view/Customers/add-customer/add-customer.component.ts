import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import { CustomerService } from '../../../service/customer.service';
import { first } from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NewCustomerdto } from 'src/app/demo/domain/Dto/Customers/NewCustomerdto';
import { CustomerMainComponent } from '../customer-main/customer-main.component';

 
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customer:NewCustomerdto;
  customerRegisterForm: FormGroup;
  addNewCustomerShow: boolean = false;
  regsubmitted = false;
  btnloading: boolean = false;

  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.SaudiArabia, CountryISO.Pakistan];
	
  constructor(private _formBuilder: FormBuilder,
    private _customersService: CustomerService,
    private messageService: MessageService,
    public main: CustomerMainComponent)
     { }
     
     @Output() eventChange = new EventEmitter<Event>();

  ngOnInit(): void {
    this.customerRegisterForm = this._formBuilder.group({
      fullName: ["", [Validators.required,Validators.pattern('[A-Za-z 0-9]+')]],
      //email: ["", [Validators.required, Validators.email , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      email: [],
      phone: new FormControl(undefined, [Validators.required]),
    });
  }


  
  phoneInvalid:boolean = false;
  onKeypressPhone(){
      this.phoneInvalid = this.customerRegisterForm.controls['phone'].invalid;
      this.btnloading = false;
      return;
  }
  onKeyUpPhone(){
      this.phoneInvalid = this.customerRegisterForm.controls['phone'].invalid;
      this.btnloading = false;
      return;
  }

  onSubmitCustomerReg() {
    this.btnloading = true;
    // if (this.customerRegisterForm.invalid) {
    //   this.btnloading = false;
    //   return;
    // }

    var model = {
      fullName: this.customerRegisterForm.value.fullName,
      email: this.customerRegisterForm.value.email,
      phoneNumber: this.customerRegisterForm.value.phone.e164Number,
    };
    this._customersService
      .addCustomerReg(model)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.main.addPanelActive = false;
            this.btnloading = false;
            this.resetForm();
          } else {
            this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            this.main.addPanelActive = true;
            this.btnloading = false;
          }
        },
        error: (error) => {
          this.main.addPanelActive = true;
          this.btnloading = false;
          this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
        },
      });
  }

  resetForm() {
    this.regsubmitted = false;
    this.customerRegisterForm.reset();
  }
}
