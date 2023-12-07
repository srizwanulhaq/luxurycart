import { CityCouponCodeDao } from "../OffesCodes/CityCouponCodeDao";

export class CouponCode {
    id: string;
    code: string;
    amount: number;
    wallet_Packages: wallet_Packages;
    expiry: Date;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    lstCityCouponCodes:CityCouponCodeDao[];
}
export class wallet_Packages{
    title:string;
}
export class couponCodResponse {
    status: boolean;
    message: string;
    couponCodeList: lstcouponCodDao;
}

export class lstcouponCodDao {
    results: CouponCode[];
    rowCount: number;
}
