import { Component, Input, OnInit } from '@angular/core';
import { CityDiscountCodeDao } from 'src/app/demo/domain/Dao/OffesCodes/CityDiscountCodeDao';
import { Discountcode } from 'src/app/demo/domain/Dao/Promotions/discountcode';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-discount-code-details',
  templateUrl: './discount-code-details.component.html',
  styleUrls: ['./discount-code-details.component.scss']
})
export class DiscountCodeDetailsComponent implements OnInit {

  private _details: Discountcode;
  discountCities:CityDiscountCodeDao[];
  constructor(public main: PromotionMainComponent,private _PromoCodeService: PackagediscountService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: Discountcode) {
    if (value) {
      this._details = value;
      this.getdiscountCities(value.id);
    }
  }
 

  get details(): Discountcode {
    return this._details;
  }
  getdiscountCities(discount_Code_Id) {
    this._PromoCodeService.getdiscountCities(discount_Code_Id).subscribe(responseList => {
       this.discountCities = responseList.discountCities.data;
    });
  }
}
