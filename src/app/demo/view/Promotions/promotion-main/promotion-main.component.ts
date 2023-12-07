import { Component, OnInit } from '@angular/core';
import { CouponCode } from 'src/app/demo/domain/Dao/Promotions/coupon-code';
import { Discountcode } from 'src/app/demo/domain/Dao/Promotions/discountcode';
import { Packagediscount } from 'src/app/demo/domain/Dao/Promotions/packagediscount';
import { PromoCode } from 'src/app/demo/domain/Dao/Promotions/promo-code';
import { EditCouponCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-coupon-code-dto';
import { EditDiscountCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-discount-code-dto';
import { EditPachageDiscountDto } from 'src/app/demo/domain/Dto/Promotion/edit-package-discountDto';
import { EditPromoCodeDto } from 'src/app/demo/domain/Dto/Promotion/edit-promo-codeDto';

@Component({
    selector: 'app-promotion-main',
    templateUrl: './promotion-main.component.html',
    styleUrls: ['./promotion-main.component.scss']
})
export class PromotionMainComponent implements OnInit {

    //Edit
    editPromoCodeData: EditPromoCodeDto;
    editPachageDiscountData: EditPachageDiscountDto;
    editDiscountCodeData: EditDiscountCodeDto;
    editCouponCodeData: EditCouponCodeDto;

    editPromoCodeActive: boolean;
    editPachageDiscountActive: boolean;
    editDiscountCodeActive: boolean;
    editCouponCodeActive: boolean;

    //Details
    packagediscount: Packagediscount;
    promoCode: PromoCode;
    couponCode: CouponCode;
    discountcode: Discountcode;

    event: Event;
    FormType: any;
    bottomPanelClick: boolean;
    bottomPanelActive: boolean;
    promocodeId: any;
    type = "promo"
    types = ['promo', 'coupon', 'discount', 'package']



    constructor() { }

    ngOnInit(): void {
    }

    onBottomPanelPromoCode(event, promoCode) {
        this.promoCode = promoCode;
        this.bottomPanelClick = true;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }

    onBottomPanelPackageDiscount(event, packagediscount) {
        this.packagediscount = packagediscount;
        this.bottomPanelClick = true;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }
    onBottomPanelCouponCode(event, couponCode) {
        this.couponCode = couponCode;
        this.bottomPanelClick = true;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }
    onBottomPanelDiscountCode(event, discountcode) {
        this.discountcode = discountcode;
        this.bottomPanelClick = true;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }

    onChange(event) {
        this.event = event;
    }

    tabChange(event) {
        this.type = this.types[event.index];
    }
    onEditPromCodeButtonClick(event, editPromoCodeData: EditPromoCodeDto) {

        this.editPromoCodeData = editPromoCodeData
        this.editPromoCodeActive = !this.editPromoCodeActive;
        event.preventDefault();
        this.event = null;
    }
    onEditPackageDiscountButtonClick(event, editPachageDiscountData: EditPachageDiscountDto) {

        this.editPachageDiscountData = editPachageDiscountData
        this.editPachageDiscountActive = !this.editPachageDiscountActive;
        event.preventDefault();
        this.event = null;
    }

    onEditDiscountCodeButtonClick(event, editDiscountCodeData: EditDiscountCodeDto) {

        this.editDiscountCodeData = editDiscountCodeData
        this.editDiscountCodeActive = !this.editDiscountCodeActive;
        event.preventDefault();
        this.event = null;
    }
    onEditCouponCodeButtonClick(event, editCouponCodeData: EditCouponCodeDto) {

        this.editCouponCodeData = editCouponCodeData
        this.editCouponCodeActive = !this.editCouponCodeActive;
        event.preventDefault();
        this.event = null;
    }

    resetEditPachageDiscount() {
        this.editPachageDiscountData = null
    }
    resetEditPromoCode() {
        this.editPromoCodeData = null
    }
    resetEditDiscountCode() {
        this.editDiscountCodeData = null
    }
    resetEditCouponCode() {
        this.editCouponCodeData = null
    }

}
