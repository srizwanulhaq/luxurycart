import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { EditCountryDto } from 'src/app/demo/domain/Dto/Countries/EditCountryDto';
import { CountryService } from 'src/app/demo/service/countryservice';
import { CurrencyService } from 'src/app/demo/service/currencyservice';
import { CountryMainComponent } from '../country-main/country-main.component';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss'],
  providers: [MessageService],

})
export class CountryEditComponent implements OnInit {


  @Input() editCountryData: EditCountryDto;
  country: EditCountryDto;
  submitted: boolean;
  countryEditForm;
  btnloading: boolean = false;
  lstCurrencies:SelectItem[] = [];
  
  constructor(public main: CountryMainComponent,
    private _formBuilder: FormBuilder,
    private service: CountryService,
    private messageService: MessageService,
    private currencyService: CurrencyService,) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownCurrency();
  }
  @Output() eventChange = new EventEmitter<Event>();

  loadForm() {
    this.countryEditForm = this._formBuilder.group({
        id:["",[Validators.required]],
        name: ["", [Validators.required]],
        arabic_name: ["", [Validators.required]],
        sub_region: ["", [Validators.required]],
        time_Zones: ["", [Validators.required]],
        translations: ["", [Validators.required]],
        currency_Id: ["", [Validators.required]]
    });
}
ngOnChanges(change: SimpleChange) {
  if (!!change['editCountryData'].currentValue) {
      const temp = change['editCountryData'].currentValue;
      debugger;
      const group: FormGroup = this.countryEditForm as FormGroup;
      group.controls['id'].setValue(temp.id || "");
      group.controls['name'].setValue(temp.name || "");
      group.controls['arabic_name'].setValue(temp.arabic_name || "");
      group.controls['sub_region'].setValue(temp.sub_Region || "");
      group.controls['time_Zones'].setValue(temp.time_Zones || "");
      group.controls['translations'].setValue(temp.translations || "");
      group.controls['currency_Id'].setValue(temp.currency.id || "" );
  }
}
onSubmitForm(){
  this.btnloading = true;
  if (this.countryEditForm.invalid) {
      this.btnloading = false;
      return;
  }

  this.editCountry(this.countryEditForm.value);
  }
  editCountry(country: EditCountryDto) {
debugger;
    this.service.updateCountry(country).pipe(first())
      .subscribe({
          next: (response) => {
              this.resetForm();
              this.main.editPanelActive = false;
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
  this.countryEditForm.reset();
  this.btnloading = false;
}
loadDropdownCurrency() {
  //load counties
  this.currencyService.loadDropDown().subscribe(responseList => {
    this.lstCurrencies = responseList.result.lstCurrencies;
  });
}

}
