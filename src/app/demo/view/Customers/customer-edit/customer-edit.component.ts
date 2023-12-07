import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { MessageService } from 'primeng/api'; 
import { EditCustomerdto } from 'src/app/demo/domain/Dto/Customers/EditCustomerdto';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { first } from "rxjs/operators";
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
 
 
  @Input() editCustomerData: EditCustomerdto;
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
      email: ["", [Validators.required, Validators.email , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: new FormControl(undefined, [Validators.required]),
  })} 
  ngOnChanges(change: SimpleChange) {
    if (!!change['editCustomerData'].currentValue) {
        const temp = change['editCustomerData'].currentValue
        const group: FormGroup = this.customerRegisterForm as FormGroup;
        group.controls['fullName'].setValue(temp.full_Name || "");
        group.controls['email'].setValue(temp.email || "");
        group.controls['phone'].setValue(temp.phone || "");
    }
   }
 
   onSubmitCustomerReg() {
    this.btnloading = true;
    if (this.customerRegisterForm.invalid) {
      this.btnloading = false;
      return;
    }
    
    this._customersService.updateCustomer({
      id: this.editCustomerData.id, 
      fullName:  this.customerRegisterForm.value.fullName,
      email:this.customerRegisterForm.value.email,
      phoneNumber:this.customerRegisterForm.value.phone.e164Number,
    }).pipe(first()).subscribe({
      next: response => {
        if (response.result) { 
          this.eventChange.emit(response.result);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
          this.main.bottomPanelActive =false
          this.main.editPanelActive =false
          this.btnloading = false;  
          this.resetForm(); 
        }
        else 
          {
          this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
          this.btnloading = false;
          this.main.editPanelActive =true;
          }
      },
      error: error => {
        this.main.editPanelActive =true;
        this.btnloading = false;
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000}); 
      }
    });
  }

  resetForm() {
    this.customerRegisterForm.reset();
    this.btnloading = false;
  }
}
