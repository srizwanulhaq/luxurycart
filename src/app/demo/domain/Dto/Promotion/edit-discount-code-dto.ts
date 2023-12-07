import { CityDiscountCodeDao } from "../../Dao/OffesCodes/CityDiscountCodeDao";

export class EditDiscountCodeDto {
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
    lstCityDiscountCodes:CityDiscountCodeDao[]
}

export class parking_Zones{
    title:string;
    number:number

}
