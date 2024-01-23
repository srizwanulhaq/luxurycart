import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { EditCityDto } from 'src/app/demo/domain/Dto/Cities/EditCityDto';
import { CityService } from 'src/app/demo/service/cityservice';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { CityMainComponent } from '../city-main/city-main.component';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss'],
  providers: [MessageService],
})
export class CityEditComponent implements OnInit {

  @Input() editCityData: EditCityDto;
  city: EditCityDto;
  cityEditDialog: boolean;
  submitted: boolean;
  cityEditForm;
  btnloading: boolean = false;
  lstCountries: SelectItem[] = [];

  constructor(public main: CityMainComponent,
    private _formBuilder: FormBuilder,
    private service: CityService,
    private _PromoCodeService: PackagediscountService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownCountry();
  }
  @Output() eventChange = new EventEmitter<Event>();
  loadForm() {
    this.cityEditForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      arabic_name: ["", [Validators.required]],
      country_Id: ["", [Validators.required]]
    });
  }
  ngOnChanges(change: SimpleChange) {
    if (!!change['editCityData'].currentValue) {
      const temp = change['editCityData'].currentValue;
      const group: FormGroup = this.cityEditForm as FormGroup;
      group.controls['id'].setValue(temp.id || "");
      group.controls['name'].setValue(temp.name || "");
      group.controls['arabic_name'].setValue(temp.arabic_name || "");
      group.controls['country_Id'].setValue(temp.country.id || "");
    }
  }

  loadDropdownCountry() {
    //load counties
    this._PromoCodeService.loadDropDown().subscribe(responseList => {
      this.lstCountries = responseList.result.lstCountries;
    });
  }
  onSubmitForm() {
    this.btnloading = true;
    if (this.cityEditForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.EditCity(this.cityEditForm.value);
  }
  EditCity(city: EditCityDto) {

    this.service.updateCity(city).pipe(first())
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
    this.cityEditForm.reset();
    this.btnloading = false;
  }
}
