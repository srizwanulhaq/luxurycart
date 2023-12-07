import { CityPackageDiscountDao } from "../../Dao/OffesCodes/CityPackageDiscountDao";


export class EditPachageDiscountDto {
    id: string;
    code: string;
    Parking_Zone_Id: string;
    Parking_Zones: parking_Zones;
    percentage_Discount: number;
    max_Purchase: number;
    expiry: Date;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    lstCityPackageDicounts:CityPackageDiscountDao[]
}

export class parking_Zones{
    title:string;
    number:number

}


