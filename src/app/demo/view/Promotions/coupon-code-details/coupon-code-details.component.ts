import { Component, Input, OnInit } from '@angular/core';
import { CityCouponCodeDao } from 'src/app/demo/domain/Dao/OffesCodes/CityCouponCodeDao';
import { CouponCode } from 'src/app/demo/domain/Dao/Promotions/coupon-code';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-coupon-code-details',
  templateUrl: './coupon-code-details.component.html',
  styleUrls: ['./coupon-code-details.component.scss']
})
export class CouponCodeDetailsComponent implements OnInit {

  private _details: CouponCode;
  couponCities:CityCouponCodeDao[];
  constructor(public main: PromotionMainComponent,private _PromoCodeService: PackagediscountService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: CouponCode) {
    if (value) {
      this._details = value;
      this.getcouponCities(value.id)
    }
  }
 

  get details(): CouponCode {
    return this._details;
  }

  getcouponCities(coupon_Code_Id) {
    this._PromoCodeService.getcouponCities(coupon_Code_Id).subscribe(responseList => {
       this.couponCities = responseList.couponCities.data;
    });
  }

}
