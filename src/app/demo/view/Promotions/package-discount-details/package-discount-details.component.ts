import { Component, Input, OnInit } from '@angular/core';
import { CityPackageDiscountDao } from 'src/app/demo/domain/Dao/OffesCodes/CityPackageDiscountDao';
import { Packagediscount } from 'src/app/demo/domain/Dao/Promotions/packagediscount';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-package-discount-details',
  templateUrl: './package-discount-details.component.html',
  styleUrls: ['./package-discount-details.component.scss']
})
export class PackageDiscountDetailsComponent implements OnInit {

  private _details: Packagediscount;
  packageCities:CityPackageDiscountDao[];
  constructor(public main: PromotionMainComponent,private _PromoCodeService: PackagediscountService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: Packagediscount) {
    if (value) {
      this._details = value;
      this.getpackageCities(value.id)
    }
  }
 

  get details(): Packagediscount {
    return this._details;
  }
  getpackageCities(package_Discount_Id) {
    this._PromoCodeService.getpackageCities(package_Discount_Id).subscribe(responseList => {
       this.packageCities = responseList.packageCities.data;
    });
  }
}
