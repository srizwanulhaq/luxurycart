import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Citydao } from 'src/app/demo/domain/Dao/Promotions/CityDropDowndao';
import { EditDiscountCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-discount-code-dto';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-discount-code-edit',
  templateUrl: './discount-code-edit.component.html',
  styleUrls: ['./discount-code-edit.component.scss'],
  providers:[MessageService,DatePipe]
})
export class DiscountCodeEditComponent implements OnInit {

  @Input()   editDiscountCodeData: EditDiscountCodeDto;;
  btnloading: boolean = false;
  EditDiscountCodeForm: any;
  regsubmitted = false;
  _itemparkingzones:SelectItem[] = [];
  country_Id:string;
  lstCountries:SelectItem[] = [];
  lstCities:Citydao[];
  getlstCities:Citydao[]=[];
  selectlstCities:Citydao[];
  cityIds:string[];
  
  constructor(public main: PromotionMainComponent,
    private _formBuilder: FormBuilder,
    private _PromoCodeService: PackagediscountService,
    private messageService: MessageService,
    private datePipe: DatePipe) { 

      this.getparkingzones(); 
      this.loadDropdownValues();
    }

  ngOnInit(): void {
    this.EditDiscountCodeForm = this._formBuilder.group({
      
      id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      percentage_Discount: [''],
      discount_Upto: [''],
      no_Of_Rides: [''],
      expiry: ['', [Validators.required]],
      Parking_Zone_Id:[""],
      country_Id:[""],
      selectlstCitiess: [""],

    });
  }

  @Output() eventChange = new EventEmitter<Event>();
  @Output() resetEditDiscountCodeData = new EventEmitter<null>();
  
  
  ngOnChanges(change: SimpleChange) {

    if (!!change['editDiscountCodeData'].currentValue) {
        const temp = change['editDiscountCodeData'].currentValue;
        const group: FormGroup = this.EditDiscountCodeForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['code'].setValue(temp.code || "");
        group.controls['percentage_Discount'].setValue(temp.percentage_Discount || "");
        group.controls['expiry'].setValue(this.datePipe.transform(temp.expiry, 'yyyy-MM-dd HH:mm:ss' ));
        group.controls['discount_Upto'].setValue(temp.discount_Upto || "");
        group.controls['no_Of_Rides'].setValue(temp.no_Of_Rides || "");
        group.controls['Parking_Zone_Id'].setValue(temp.parking_Zone_Id || "" );
        group.controls['country_Id'].setValue(temp.lstCityDiscountCodes[0].city.country_Id || "" );
       this.getCityIds(temp.lstCityDiscountCodes[0].city.country_Id);

       this.selectlstCities = [];
       temp.lstCityDiscountCodes.forEach(discount_code =>  {
         this.selectlstCities.push(discount_code.city);
       });
    }
  }
  onSubmitUpdate() {
    this.regsubmitted = true;
    this.btnloading = true;
    if (this.EditDiscountCodeForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.setCityId();
    var model:Object=null;
     model = {
      id:this.editDiscountCodeData.id,
      Parking_Zone_Id: this.EditDiscountCodeForm.value.Parking_Zone_Id,
      title: this.EditDiscountCodeForm.value.title,
      code: this.EditDiscountCodeForm.value.code,
      percentage_Discount: Number(this.EditDiscountCodeForm.value.percentage_Discount),
      discount_Upto: Number(this.EditDiscountCodeForm.value.discount_Upto),
      no_Of_Rides: Number(this.EditDiscountCodeForm.value.no_Of_Rides),
      expiry: this.EditDiscountCodeForm.value.expiry,
      cityIds:  this.cityIds,
    }
    this._PromoCodeService
      .addpromocodeMain(model,'discount')
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.btnloading = false;
            this.main.editDiscountCodeActive = false;
            this.main.bottomPanelActive = false;
            
          } else {
            this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
          }
        },
        error: (error) => {
          this.btnloading = false;
          this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
        },
      });
  }
  getparkingzones() {

    this._PromoCodeService.getparkingzones()
    .subscribe(resp => {
      resp.data.forEach(i=> {     
        this._itemparkingzones.push({ label: i.title, value: i.id });
      });   
    });
  }
  loadDropdownValues() {
    //load counties
    
    this._PromoCodeService.loadDropDown().subscribe(responseList => {
      this.lstCountries = responseList.result.lstCountries;
    });
  }
  onSelect(e){
    this.selectlstCities = [];
    this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
      this.lstCities = responseList.result.lstCities;
      this.getlstCities =  this.lstCities.filter(z => z.country_Id == e.value );
   });
  
  }
  getCityIds(country_Id){
    this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
      this.lstCities = responseList.result.lstCities;
      this.getlstCities =  this.lstCities.filter(z => z.country_Id == country_Id );
   });
  }
  setCityId(){
    var lstcityDiscountCodes2 = [];
    this.EditDiscountCodeForm.value.selectlstCitiess.forEach(city_promo =>  {
      lstcityDiscountCodes2.push( city_promo.id,);
    });
    this.cityIds = lstcityDiscountCodes2;
  }
}
