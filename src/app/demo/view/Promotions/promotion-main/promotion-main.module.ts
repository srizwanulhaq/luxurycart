import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionMainRoutingModule } from './promotion-main-routing.module';
import { TableModule } from 'primeng/table';
import { PromotionMainComponent } from './promotion-main.component';
import { PromotionListingsComponent } from '../promotion-listings/promotion-listings.component';
import { PromoCodeListingComponent } from '../promo-code-listing/promo-code-listing.component';
import { CouponCodeListingComponent } from '../coupon-code-listing/coupon-code-listing.component';
import { DiscountCodeListingComponent } from '../discount-code-listing/discount-code-listing.component';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { RouterModule } from '@angular/router';
import { IconService } from 'src/app/demo/service/iconservice';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddpromocodeComponent } from '../addpromocode/addpromocode.component';
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PromoCodeDetailsComponent } from '../promo-code-details/promo-code-details.component';
import { SidebarModule } from 'primeng/sidebar';
import { PackageDiscountDetailsComponent } from '../package-discount-details/package-discount-details.component';
import { CouponCodeDetailsComponent } from '../coupon-code-details/coupon-code-details.component';
import { DiscountCodeDetailsComponent } from '../discount-code-details/discount-code-details.component';
import { PromoCodeEditComponent } from '../promo-code-edit/promo-code-edit.component';
import { PackageDiscountEditComponent } from '../package-discount-edit/package-discount-edit.component';
import { DiscountCodeEditComponent } from '../discount-code-edit/discount-code-edit.component';
import { CouponCodeEditComponent } from '../coupon-code-edit/coupon-code-edit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { CodeUsesListingComponent } from '../code-uses/code-uses-listing.component';
import { DateRangeComponentModule } from '../../DateRange/date-range.component.module';
@NgModule({
    declarations: [
        PromotionMainComponent,
        PromotionListingsComponent,
        PromoCodeListingComponent,
        CouponCodeListingComponent,
        DiscountCodeListingComponent,
        AddpromocodeComponent,
        PromoCodeDetailsComponent,
        PackageDiscountDetailsComponent,
        CouponCodeDetailsComponent,
        DiscountCodeDetailsComponent,
        PromoCodeEditComponent,
        PackageDiscountEditComponent,
        DiscountCodeEditComponent,
        CouponCodeEditComponent,
        CodeUsesListingComponent
    ],
    imports: [
        CommonModule,
        DateRangeComponentModule,
        TableModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        ToolbarModule,
        DropdownModule,
        DialogModule,
        ToastModule,
        AutoCompleteModule,
        FormsModule,
        ReactiveFormsModule,
        PromotionMainRoutingModule,
        InputSwitchModule,
        CheckboxModule,
        InputTextModule,
        SidebarModule,
        MultiSelectModule,
        ListboxModule,
    ],
    providers: [
        PackagediscountService,
        IconService,
        MessageService
    ]
})
export class PromotionMainModule { }
