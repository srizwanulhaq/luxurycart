import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityCouponCodeListResponse } from '../domain/Dao/OffesCodes/CityCouponCodeDao';
import { CityDiscountCodeListResponse } from '../domain/Dao/OffesCodes/CityDiscountCodeDao';
import { CityPackageDiscountListResponse } from '../domain/Dao/OffesCodes/CityPackageDiscountDao';
import { CityPromoCodeListResponse } from '../domain/Dao/OffesCodes/CityPromoCodeDao';
import { CityDropDownResult } from '../domain/Dao/Promotions/CityDropDowndao';
import { couponCodResponse } from '../domain/Dao/Promotions/coupon-code';
import { DiscountCodeResponse } from '../domain/Dao/Promotions/discountcode';
import { DropDownResult } from '../domain/Dao/Promotions/DropDowndao';
import { PackageDiscountResponse } from '../domain/Dao/Promotions/packagediscount';
import { PromoCodeResponse } from '../domain/Dao/Promotions/promo-code';
import { CodeUsesResponse } from '../domain/Dao/Promotions/CodeUsesDao';

@Injectable({
    providedIn: 'root'
})
export class PackagediscountService {

    constructor(private http: HttpClient) { }
    get(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number) {
        return this.http.get<any>(
            `${environment.apiUrl}/api/v1/AdminPromotions/get-promotions?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as PackageDiscountResponse)
            .then(results => results.packagediscountList);
    }
    getpromocode(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number) {
        return this.http.get<any>(
            `${environment.apiUrl}/api/v1/AdminPromotions/get-promotions?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as PromoCodeResponse)
            .then(results => results.promoCodeList);
    }
    getcouponcode(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number) {
        return this.http.get<any>(
            `${environment.apiUrl}/api/v1/AdminPromotions/get-promotions?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as couponCodResponse)
            .then(results => results.couponCodeList);
    }
    getdiscountcode(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number) {
        return this.http.get<any>(
            `${environment.apiUrl}/api/v1/AdminPromotions/get-promotions?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as DiscountCodeResponse)
            .then(results => results.discountCodeList);
    }

    getCodeUses(
        id: string,
        type: "promo" | "coupon" | "discount" | "package",
        globalFilter: string,
        pageIndex: number = 1,
        pageSize: number = 10,
        sortField: string = "",
        sortOrder: number = -1
    ) {
        return this.http.get<any>(
            `${environment.apiUrl}/api/v1/AdminPromotions/${type}/${id}/uses?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as CodeUsesResponse)
            .then(results => results.data.uses);
    }

    addpromocodeMain(model: any, type: string) {
        if (type == 'coupon') {
            return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCouponCodes/save-update`, model);
        }
        else if (type == 'discount') {
            return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminDiscountCodes/save-update`, model);
        }
        else if (type == 'package') {
            return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPackageDiscounts/save-update`, model);
        }
        else if (type == 'promo' && model.id != null) {
            return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPromotions/updatePromotions`, model);
        }

        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPromotions/savePromotions`, model);

    }
    getpackages() {
        return this.http
            .get<any>(`${environment.apiUrl}/api/v1/AdminCouponCodes/get-packages`);
    }
    getparkingzones() {
        return this.http
            .get<any>(`${environment.apiUrl}/api/v1/AdminDiscountCodes/get-parking_zones`);
    }
    loadDropDown() {
        return this.http
            .get<DropDownResult>(`${environment.apiUrl}/api/v2/AdminOfferCodes/dropdowns/load-values`);
    }
    loadCityDropDown() {
        return this.http
            .get<CityDropDownResult>(`${environment.apiUrl}/api/v2/AdminOfferCodes/cities/dropdown`);
    }
    getpromoCities(promo_Code_Id) {
        return this.http.get<CityPromoCodeListResponse>(`${environment.apiUrl}/api/v2/AdminOfferCodes/promoCities?promo_Code_Id=${promo_Code_Id}`);
    }
    getcouponCities(coupon_Code_Id) {
        return this.http.get<CityCouponCodeListResponse>(`${environment.apiUrl}/api/v2/AdminOfferCodes/couponCities?coupon_Code_Id=${coupon_Code_Id}`);
    }
    getdiscountCities(discount_Code_Id) {
        return this.http.get<CityDiscountCodeListResponse>(`${environment.apiUrl}/api/v2/AdminOfferCodes/discountCities?discount_Code_Id=${discount_Code_Id}`);
    }
    getpackageCities(package_Discount_Id) {
        return this.http.get<CityPackageDiscountListResponse>(`${environment.apiUrl}/api/v2/AdminOfferCodes/packageCities?package_Discount_Id=${package_Discount_Id}`);
    }
}
