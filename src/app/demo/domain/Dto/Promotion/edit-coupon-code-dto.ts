import { CityCouponCodeDao } from "../../Dao/OffesCodes/CityCouponCodeDao";

export class EditCouponCodeDto {
    id: string;
    code: string;
    amount: number;
    wallet_Packages: wallet_Packages;
    expiry: Date;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    lstCityCouponCodes:CityCouponCodeDao[]
}
export class wallet_Packages{
    id:string;
    title:string;
}