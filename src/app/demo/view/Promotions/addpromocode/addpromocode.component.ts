import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { getpackages, NewPromoCode } from 'src/app/demo/domain/Dto/PromocodeDto/new-promo-code';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { first } from "rxjs/operators";
import { GetpackagesDto } from 'src/app/demo/domain/Dto/PromocodeDto/getpackages-dto';
import { GetparkinZonesDto } from 'src/app/demo/domain/Dto/PromocodeDto/getparkin-zones-dto';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';
import { Citydao } from 'src/app/demo/domain/Dao/Promotions/CityDropDowndao';


@Component({
    selector: 'app-addpromocode',
    templateUrl: './addpromocode.component.html',
    styleUrls: ['./addpromocode.component.scss']
})
export class AddpromocodeComponent implements OnInit {
    promocode: NewPromoCode;
    codeForm: FormGroup;
    addNewpromocodeShow: boolean = false;
    regsubmitted = false;
    btnloading: boolean = false;
    submitted: boolean;
    getpackagesdata: GetpackagesDto;
    _itempackages: SelectItem[] = [];
    _itempackagesval: number;
    getparkingzonesdata: GetparkinZonesDto;
    _itemparkingzones: SelectItem[] = [];
    lstCountries: SelectItem[] = [];
    lstCities: Citydao[];
    getlstCities: Citydao[];
    cityIds: string[];

    _itemparkingzonesval: number;
    @Input() type: string
    fields: { [key: string]: { name: string, value: any, validators: any[] }[] } = {
        promo: [
            { name: "country_Id", value: "", validators: [Validators.required] },
            { name: "cityIds", value: "", validators: [Validators.required] },
            { name: "code", value: "", validators: [Validators.required] },
            { name: "quantity", value: "", validators: [Validators.required, Validators.pattern('[+()0-9]+')] },
            { name: "per_Usage", value: "", validators: [Validators.required, Validators.pattern('[+()0-9]+')] },
            { name: "credits", value: "", validators: [Validators.required, Validators.pattern('[+()0-9]+')] },
            { name: "start_Date", value: "", validators: [Validators.required] },
            { name: "end_Date", value: "", validators: [Validators.required] },
            { name: "is_New_User", value: false, validators: [Validators.required] },
        ],
        coupon: [
            { name: "country_Id", value: "", validators: [Validators.required] },
            { name: "cityIds", value: "", validators: [Validators.required] },
            { name: "package_Id", value: "", validators: [Validators.required] },
            { name: "code", value: "", validators: [Validators.required] },
            { name: "amount", value: "", validators: [Validators.required, Validators.pattern('[+()0-9]+')] },
            { name: "expiry", value: "", validators: [Validators.required] }
        ],
        discount: [
            { name: "country_Id", value: "", validators: [Validators.required] },
            { name: "cityIds", value: "", validators: [Validators.required] },
            { name: "Parking_Zone_Id", value: "", validators: [Validators.required] },
            { name: "code", value: "", validators: [Validators.required] },
            { name: "percentage_Discount", value: "", validators: [Validators.required] },
            { name: "discount_Upto", value: "", validators: [Validators.required] },
            { name: "no_Of_Rides", value: "", validators: [Validators.required] },
            { name: "expiry", value: "", validators: [Validators.required] },
        ],
        package: [
            { name: "country_Id", value: "", validators: [Validators.required] },
            { name: "cityIds", value: "", validators: [Validators.required] },
            { name: "Parking_Zone_Id", value: "", validators: [Validators.required] },
            { name: "code", value: "", validators: [Validators.required] },
            { name: "percentage_Discount", value: "", validators: [Validators.required] },
            { name: "max_Purchase", value: "", validators: [Validators.required, Validators.pattern('[+()0-9]+')] },
            { name: "expiry", value: "", validators: [Validators.required] },
        ]
    }


    constructor(private _formBuilder: FormBuilder,
        private _PromoCodeService: PackagediscountService,
        private messageService: MessageService,
        public main: PromotionMainComponent) {
        this.getpackagesforCouponCode();
        this.getparkingzones();
        this.loadDropdownValues();
    }
    @Output() eventChange = new EventEmitter<Event>();
    ngOnInit(): void {
    }



    showPromoCodeRegForm() {
        if (!!this.codeForm) {
            this.resetForm();
        }
        const fields = this.fields[this.type].reduce((a, v) => ({ ...a, [v.name]: [v.value, v.validators] }), {})
        this.codeForm = this._formBuilder.group(fields)
        this.addNewpromocodeShow = true;
        this.btnloading = false;
    }
    onSubmitPromoCodeReg() {
        this.regsubmitted = true;
        this.btnloading = true;

        console.log(this.codeForm.value);

        if (this.codeForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.setCityIds();
        var model: Object = null;
        if (this.type == 'promo') {
            model = {
                code: this.codeForm.value.code,
                quantity: Number(this.codeForm.value.quantity),
                per_Usage: Number(this.codeForm.value.per_Usage),
                credits: Number(this.codeForm.value.credits),
                start_Date: this.codeForm.value.start_Date,
                end_Date: this.codeForm.value.end_Date,
                is_New_User: this.codeForm.value.is_New_User,
                country_Id: this.codeForm.value.country_Id,
                cityIds: this.cityIds,
            }

        }
        else if (this.type == 'coupon') {
            model = {
                package_Id: this.codeForm.value.package_Id,
                code: this.codeForm.value.code,
                amount: Number(this.codeForm.value.amount),
                expiry: this.codeForm.value.expiry,
                country_Id: this.codeForm.value.country_Id,
                cityIds: this.cityIds,
            }
        }
        else if (this.type == 'discount') {
            model = {
                Parking_Zone_Id: this.codeForm.value.Parking_Zone_Id,
                title: this.codeForm.value.title,
                code: this.codeForm.value.code,
                percentage_Discount: Number(this.codeForm.value.percentage_Discount),
                discount_Upto: Number(this.codeForm.value.discount_Upto),
                no_Of_Rides: Number(this.codeForm.value.no_Of_Rides),
                expiry: this.codeForm.value.expiry,
                country_Id: this.codeForm.value.country_Id,
                cityIds: this.cityIds,
            }
        }
        else if (this.type == 'package') {
            model = {
                Parking_Zone_Id: this.codeForm.value.Parking_Zone_Id,
                title: this.codeForm.value.title,
                code: this.codeForm.value.code,
                percentage_Discount: Number(this.codeForm.value.percentage_Discount),
                max_Purchase: Number(this.codeForm.value.max_Purchase),
                expiry: this.codeForm.value.expiry,
                country_Id: this.codeForm.value.country_Id,
                cityIds: this.cityIds,
            }
        }
        //return;
        this._PromoCodeService
            .addpromocodeMain(model, this.type)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.result) {
                        this.eventChange.emit(response.result);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.resetForm();
                        this.addNewpromocodeShow = false;
                        this.btnloading = false;

                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.addNewpromocodeShow = false;
                    this.resetForm();
                    this.btnloading = false;
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }
    resetForm() {
        this.codeForm.reset();
        this.btnloading = false;
    }
    getpackagesforCouponCode() {
        this._PromoCodeService.getpackages()
            .subscribe(resp => {
                resp.data.forEach(i => {
                    this._itempackages.push({ label: i.title, value: i.id });
                });
            });
    }
    getparkingzones() {
        this._PromoCodeService.getparkingzones()
            .subscribe(resp => {
                resp.data.forEach(i => {
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
    onSelect(e) {
        this._PromoCodeService.loadCityDropDown().subscribe(responseList => {
            this.lstCities = responseList.result.lstCities;
            this.getlstCities = this.lstCities.filter(z => z.country_Id == e.value);
        });

    }
    setCityIds() {
        var lstcityIds = [];
        this.codeForm.value.cityIds.forEach(city_promo => {
            lstcityIds.push(city_promo.id);
        });
        this.cityIds = lstcityIds;
    }
}
