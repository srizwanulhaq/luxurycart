import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewCountryDto } from 'src/app/demo/domain/Dto/Countries/NewCountryDto';
import { CountryService } from 'src/app/demo/service/countryservice';
import { CurrencyService } from 'src/app/demo/service/currencyservice';
import { CountryMainComponent } from '../country-main/country-main.component';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.scss'],
  providers: [MessageService],
})
export class CountryCreateComponent implements OnInit {

  country: NewCountryDto;
  countryDialog: boolean;
  submitted: boolean;
  countryForm;
  btnloading: boolean = false;
  lstCurrencies:SelectItem[] = [];
  constructor(public main: CountryMainComponent,
    private _formBuilder: FormBuilder,
    private service: CountryService,
    private messageService: MessageService,
    private currencyService: CurrencyService,) { }

  @Output() eventChange = new EventEmitter<Event>();

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownCurrency();
  }
    openNew() {
      this.submitted = false;
      this.countryDialog = true;
      this.main.event = null;
      this.resetForm();
  }
  loadForm() {
    this.countryForm = this._formBuilder.group({
        name: ["", [Validators.required]],
        arabic_name: ["", [Validators.required]],
        sub_region: ["", [Validators.required]],
        time_Zones: ["", [Validators.required]],
        translations: ["", [Validators.required]],
        currency_Id: ["", [Validators.required]]
    });
}
  onSubmitForm(){
  this.btnloading = true;
  if (this.countryForm.invalid) {
      this.btnloading = false;
      return;
  }

  this.addNewCountry(this.countryForm.value);
  }
  addNewCountry(country: NewCountryDto) {

    this.service.saveCountry(country).pipe(first())
      .subscribe({
          next: (response) => {
              this.resetForm();
              this.countryDialog = false;
              if (response.status) {
                  this.eventChange.emit(response.status);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
              } else {
                  this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
              }
          },
          error: (error) => {
              this.btnloading = false;
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
          },
      });
}
resetForm() {
  this.countryForm.reset();
  this.btnloading = false;
}
loadDropdownCurrency() {
  //load counties
  this.currencyService.loadDropDown().subscribe(responseList => {
    this.lstCurrencies = responseList.result.lstCurrencies;
  });
}
}
