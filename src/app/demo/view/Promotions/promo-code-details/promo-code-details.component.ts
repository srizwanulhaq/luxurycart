import { Component, Input, OnInit } from '@angular/core';
import { CityDao } from 'src/app/demo/domain/Dao/Cities/CityDao';
import { CityPromoCodeDao } from 'src/app/demo/domain/Dao/OffesCodes/CityPromoCodeDao';
import { PromoCode } from 'src/app/demo/domain/Dao/Promotions/promo-code';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-promo-code-details',
  templateUrl: './promo-code-details.component.html',
  styleUrls: ['./promo-code-details.component.scss']
})
export class PromoCodeDetailsComponent implements OnInit {

  private _details: PromoCode;
  promoCities:CityPromoCodeDao[];
  constructor(public main: PromotionMainComponent,private _PromoCodeService: PackagediscountService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: PromoCode) {
    if (value) {
      this._details = value;
      this.getpromoCities(value.id);
  }
}

  get details(): PromoCode {
    return this._details;
  }

  getpromoCities(promo_Code_Id) {
    this._PromoCodeService.getpromoCities(promo_Code_Id).subscribe(responseList => {
       this.promoCities = responseList.promoCities.data;
    });
  }
}
