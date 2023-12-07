import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Citydao } from 'src/app/demo/domain/Dao/Promotions/CityDropDowndao';
import { EditPachageDiscountDto } from 'src/app/demo/domain/Dto/Promotion/edit-package-discountDto';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-package-discount-edit',
  templateUrl: './package-discount-edit.component.html',
  styleUrls: ['./package-discount-edit.component.scss'],
  providers:[MessageService,DatePipe],
})
export class PackageDiscountEditComponent implements OnInit {
 
 
  @Input()   editPachageDiscountData: EditPachageDiscountDto;;
  btnloading: boolean = false;
  EditPackageDicountForm: any;
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

  @Output() eventChange = new EventEmitter<Event>();
  @Output() resetEditPachageDiscountData = new EventEmitter<null>();


  ngOnInit(): void {
    this.EditPackageDicountForm = this._formBuilder.group({
      
      id: ['', [Validators.required]],
      code: ['', [Validators.required]],
      percentage_Discount: [''],
      max_Purchase: [''],
      expiry: ['', [Validators.required]],
      Parking_Zone_Id:[""],
      country_Id:[""],
      selectlstCitiess: [""],
    });
  }
  ngOnChanges(change: SimpleChange) {
    if (!!change['editPachageDiscountData'].currentValue) {
        const temp = change['editPachageDiscountData'].currentValue;
        const group: FormGroup = this.EditPackageDicountForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['code'].setValue(temp.code || "");
        group.controls['percentage_Discount'].setValue(temp.percentage_Discount || "");
        group.controls['expiry'].setValue(this.datePipe.transform(temp.expiry, 'yyyy-MM-dd'));
        group.controls['max_Purchase'].setValue(temp.max_Purchase || "");
        group.controls['Parking_Zone_Id'].setValue(temp.parking_Zone_Id || "" );
        group.controls['country_Id'].setValue(temp.lstCityPackageDiscounts[0].city.country_Id || "" );
       
       
       this.getCityIds(temp.lstCityPackageDiscounts[0].city.country_Id);
       this.selectlstCities = [];
       temp.lstCityPackageDiscounts.forEach(package_discount =>  {
         this.selectlstCities.push(package_discount.city);
       });
    }
  }

  onSubmitUpdate() {
    this.regsubmitted = true;
    this.btnloading = true;
    if (this.EditPackageDicountForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.setCityId();
    var model:Object=null;
     model = {
      id:this.editPachageDiscountData.id,
      Parking_Zone_Id: this.EditPackageDicountForm.value.Parking_Zone_Id,
      title: this.EditPackageDicountForm.value.title,
      code: this.EditPackageDicountForm.value.code,
      percentage_Discount: Number(this.EditPackageDicountForm.value.percentage_Discount),
      max_Purchase: Number(this.EditPackageDicountForm.value.max_Purchase),
      expiry: this.EditPackageDicountForm.value.expiry,
      cityIds:  this.cityIds,
    }
 
    this._PromoCodeService
      .addpromocodeMain(model,'package')
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.result) {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.btnloading = false;
            this.main.editPachageDiscountActive = false;
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
  setCityId(){
    var lstcityPackageDiscount2 = [];
    this.EditPackageDicountForm.value.selectlstCitiess.forEach(city_package =>  {
      lstcityPackageDiscount2.push(city_package.id,);
    });
    this.cityIds = lstcityPackageDiscount2 ;
  }
  getCityIds(country_Id){
    this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
      this.lstCities = responseList.result.lstCities;
      this.getlstCities =  this.lstCities.filter(z => z.country_Id == country_Id );
   });
  }
}
