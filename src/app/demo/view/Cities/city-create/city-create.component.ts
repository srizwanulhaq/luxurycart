import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewCityDto } from 'src/app/demo/domain/Dto/Cities/NewCityDto';
import { CityService } from 'src/app/demo/service/cityservice';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { CityMainComponent } from '../city-main/city-main.component';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.scss'],
  providers: [MessageService],
})
export class CityCreateComponent implements OnInit {
 
  
  city: NewCityDto;
  cityDialog: boolean;
  submitted: boolean;
  cityForm;
  btnloading: boolean = false;
  lstCountries:SelectItem[] = [];

  @Output() eventChange = new EventEmitter<Event>();
  constructor( public main: CityMainComponent,
    private _formBuilder: FormBuilder,
    private service: CityService,
    private _PromoCodeService: PackagediscountService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownCountry();
  }
    openNew() {
      this.submitted = false;
      this.cityDialog = true;
      this.main.event = null;
      this.resetForm();
  }
  loadForm() {
    this.cityForm = this._formBuilder.group({
        name: ["", [Validators.required]],
        arabic_name: ["", [Validators.required]],
        country_Id: ["", [Validators.required]]
    });
}
loadDropdownCountry() {
  //load counties
  this._PromoCodeService.loadDropDown().subscribe(responseList => {
    this.lstCountries = responseList.result.lstCountries;
  });
}
  onSubmitForm(){
    this.btnloading = true;
    if (this.cityForm.invalid) {
        this.btnloading = false;
        return;
    }

    this.addNewCity(this.cityForm.value);
    }
    addNewCity(city: NewCityDto) {

    this.service.saveCity(city).pipe(first())
      .subscribe({
          next: (response) => {
              this.resetForm();
              this.cityDialog = false;
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
  this.cityForm.reset();
  this.btnloading = false;
}
}
