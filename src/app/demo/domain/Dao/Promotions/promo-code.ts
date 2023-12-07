import { CityPromoCodeDao } from "../OffesCodes/CityPromoCodeDao";

export class PromoCode {
    id: string;
    code: string;
    quantity: number;
    number: number;
    credits: number;
    start_Date: Date;
    end_Date: Date;
    is_New_User:boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    per_Usage:number;
    lstCityPromoCodes:CityPromoCodeDao[]
}
export class PromoCodeResponse {
    status: boolean;
    message: string;
    promoCodeList: lstPromoCodeDiscountDao;
}

export class lstPromoCodeDiscountDao {
    results: PromoCode[];
    rowCount: number;
}
