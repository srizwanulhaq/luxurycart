import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Citydao } from 'src/app/demo/domain/Dao/Promotions/CityDropDowndao';
import { EditCouponCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-coupon-code-dto';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-coupon-code-edit',
  templateUrl: './coupon-code-edit.component.html',
  styleUrls: ['./coupon-code-edit.component.scss'],
  providers:[MessageService,DatePipe]
})
export class CouponCodeEditComponent implements OnInit {

  @Input()   editCouponCodeData: EditCouponCodeDto;;
  btnloading: boolean = false;
  EditCouponCodeForm: any;
  regsubmitted = false;
  _itempackages:SelectItem[] = [];
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
      this.getpackages();
      this.loadDropdownValues();
    }

  ngOnInit(): void {
    this.EditCouponCodeForm = this._formBuilder.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      amount: [''],
      expiry: ['', [Validators.required]],
      package_Id:[""],
      country_Id:[""],
      selectlstCitiess: [""],
    });
}
   @Output() eventChange = new EventEmitter<Event>();
   @Output() resetEditCouponCodeData = new EventEmitter<null>();

   ngOnChanges(change: SimpleChange) {

    if (!!change['editCouponCodeData'].currentValue) {
        const temp = change['editCouponCodeData'].currentValue;
        const group: FormGroup = this.EditCouponCodeForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['code'].setValue(temp.code || "");
        group.controls['amount'].setValue(temp.amount || "");
        group.controls['expiry'].setValue(this.datePipe.transform(temp.expiry, 'yyyy-MM-dd'));
        group.controls['package_Id'].setValue(temp.package_Id || "" );
        group.controls['country_Id'].setValue(temp.lstCityCouponCodes[0].city.country_Id || "" );
        this.getCityIds(temp.lstCityCouponCodes[0].city.country_Id);

       this.selectlstCities = [];
       temp.lstCityCouponCodes.forEach(discount_code =>  {
         this.selectlstCities.push(discount_code.city);
       });
    }
  }

  onSubmitUpdate() {
    this.regsubmitted = true;
    this.btnloading = true;
    if (this.EditCouponCodeForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.setCityId();
    var model:Object=null;
     model = {
      id:this.editCouponCodeData.id,
      package_Id: this.EditCouponCodeForm.value.package_Id,
      code: this.EditCouponCodeForm.value.code,
      amount: Number(this.EditCouponCodeForm.value.amount),
      expiry: this.EditCouponCodeForm.value.expiry,
      cityIds:  this.cityIds,
    }
 
    this._PromoCodeService
      .addpromocodeMain(model,'coupon')
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.btnloading = false;
            this.main.editCouponCodeActive = false;
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
  getpackages() {
    this._PromoCodeService.getpackages()
    .subscribe(resp => {
      resp.data.forEach(i=> {  
        this._itempackages.push({ label: i.title, value: i.id });
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
  setCityId(){
    var lstcityCouponCodes2 = [];
    this.EditCouponCodeForm.value.selectlstCitiess.forEach(city_coupon =>  {
      lstcityCouponCodes2.push( city_coupon.id,);
    });
    this.cityIds = lstcityCouponCodes2;
  }
  getCityIds(country_Id){
    this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
      this.lstCities = responseList.result.lstCities;
      this.getlstCities =  this.lstCities.filter(z => z.country_Id == country_Id );
   });
  }
}
