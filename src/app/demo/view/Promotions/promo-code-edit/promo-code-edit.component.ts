import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { EditPromoCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-promo-codeDto';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';
import { first } from "rxjs/operators";
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { Citydao } from 'src/app/demo/domain/Dao/Promotions/CityDropDowndao';

@Component({
    selector: 'app-promo-code-edit',
    templateUrl: './promo-code-edit.component.html',
    styleUrls: ['./promo-code-edit.component.scss'],
    providers: [MessageService, DatePipe],
})
export class PromoCodeEditComponent implements OnInit {

    //private _details:EditPromoCodeDto;
    @Input() editPromoCodeData: EditPromoCodeDto;
    //editPromoCodeData: EditPromoCodeDto;
    btnloading: boolean = false;
    EditPromoCodeForm: any;
    is_New_User: boolean;
    regsubmitted = false;
    @Input() type: string
    country_Id: string;
    lstCountries: SelectItem[] = [];
    lstCities: Citydao[];
    getlstCities: Citydao[];
    selectlstCities: Citydao[];
    cityIds: string[];

    constructor(public main: PromotionMainComponent,
        private _PromoCodeService: PackagediscountService,
        private _formBuilder: FormBuilder,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef,
        private datePipe: DatePipe) {
        this.loadDropdownValues();
    }

    @Output() eventChange = new EventEmitter<Event>();
    @Output() resetEditPromoCodeData = new EventEmitter<null>();

    ngOnInit(): void {
        this.EditPromoCodeForm = this._formBuilder.group({

            id: ['', [Validators.required]],
            code: ['', [Validators.required]],
            quantity: ['', [Validators.pattern('[+()0-9]+')]],
            per_Usage: ['', [Validators.pattern('[()0-9]+')]],
            credits: [''],
            start_Date: ['', [Validators.required]],
            end_Date: ['', [Validators.required]],
            is_New_User: [false, [Validators.required]],
            country_Id: [''],
            selectlstCitiess: [''],

        });
    }

    // @Input()
    // set details(value: EditPromoCodeDto) {
    //   if (value) {
    //     this._details = value;
    //     console.log(this._details);
    //     this.getCityIds(this._details.lstCityPromoCodes[0].city.country_Id);
    //     this.setValues();
    //   }
    // }
    // get details(): EditPromoCodeDto {
    //   return this._details;
    // }
    // setValues() {
    //   if(this.details){
    //     console.log(this.details);
    //     alert("yes");
    //     // this.details.lstCityPromoCodes.forEach(element => {
    //     //   this.selectlstCities.push(element.city);
    //     // });


    //     console.log(this.selectlstCities);
    //   }
    // }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    ngOnChanges(change: SimpleChange) {
        if (!!change['editPromoCodeData'].currentValue) {

            const temp = change['editPromoCodeData'].currentValue;
            const group: FormGroup = this.EditPromoCodeForm as FormGroup;
            group.controls['id'].setValue(temp.id || "");
            group.controls['code'].setValue(temp.code || "");
            group.controls['quantity'].setValue(temp.quantity || "");
            group.controls['per_Usage'].setValue(temp.per_Usage || "");
            group.controls['start_Date'].setValue(this.datePipe.transform(temp.start_Date, 'yyyy-MM-dd'));
            group.controls['end_Date'].setValue(this.datePipe.transform(temp.end_Date, 'yyyy-MM-dd'));
            group.controls['credits'].setValue(temp.credits || "");
            group.controls['is_New_User'].setValue(temp.is_New_User);
            group.controls['country_Id'].setValue(temp.lstCityPromoCodes[0].city.country_Id || "");

            this.getCityIds(temp.lstCityPromoCodes[0].city.country_Id);

            this.selectlstCities = [];
            temp.lstCityPromoCodes.forEach(city_promo => {
                this.selectlstCities.push(city_promo.city);
            });
        }

    }

    onSubmitUpdate() {
        this.regsubmitted = true;
        this.btnloading = true;
        if (this.EditPromoCodeForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.setCityId();
        var model: Object = null;
        model = {
            id: this.editPromoCodeData.id,
            code: this.EditPromoCodeForm.value.code,
            quantity: Number(this.EditPromoCodeForm.value.quantity),
            per_Usage: Number(this.EditPromoCodeForm.value.per_Usage),
            credits: Number(this.EditPromoCodeForm.value.credits),
            start_Date: this.EditPromoCodeForm.value.start_Date,
            end_Date: this.EditPromoCodeForm.value.end_Date,
            is_New_User: this.EditPromoCodeForm.value.is_New_User,
            cityIds: this.cityIds,
        }

        this._PromoCodeService
            .addpromocodeMain(model, 'promo')
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.result) {
                        this.eventChange.emit(response.result);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.btnloading = false;
                        this.main.editPromoCodeActive = false;
                        this.main.bottomPanelActive = false;

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
    loadDropdownValues() {
        //load counties

        this._PromoCodeService.loadDropDown().subscribe(responseList => {
            this.lstCountries = responseList.result.lstCountries;
        });
    }
    onSelect(e) {
        this.selectlstCities = [];
        this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
            this.lstCities = responseList.result.lstCities;
            this.getlstCities = this.lstCities.filter(z => z.country_Id == e.value);
        });

    }

    getCityIds(country_Id) {
        this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
            this.lstCities = responseList.result.lstCities;
            this.getlstCities = this.lstCities.filter(z => z.country_Id == country_Id);
        });

    }
    setCityId() {
        var lstcityPromoCodes2 = [];
        this.EditPromoCodeForm.value.selectlstCitiess.forEach(city_promo => {
            lstcityPromoCodes2.push(city_promo.id);
        });
        this.cityIds = lstcityPromoCodes2;
    }

}

