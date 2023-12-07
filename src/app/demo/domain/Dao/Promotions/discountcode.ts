import { CityDiscountCodeDao } from "../OffesCodes/CityDiscountCodeDao";

export class Discountcode {
    id: string;
    code: string;
    Parking_Zones: parking_Zones;
    percentage_Discount: number;
    discount_Upto: number;
    no_Of_Rides: number;
    expiry: Date;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    lstCityDiscountCodes:CityDiscountCodeDao[];
}
export class parking_Zones{
    title:string;
    number:number

}
export class DiscountCodeResponse {
    status: boolean;
    message: string;
    discountCodeList: lstDiscountCodeDao;
}

export class lstDiscountCodeDao {
    results: Discountcode[];
    rowCount: number;
}
