import { CityPackageDiscountDao } from "../OffesCodes/CityPackageDiscountDao";

export class Packagediscount {
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
    lstCityPackageDiscounts:CityPackageDiscountDao[]
}
export class parking_Zones{
    title:string;
    number:number

}
export class PackageDiscountResponse {
    status: boolean;
    message: string;
    packagediscountList: lstPackageDiscountDao;
}

export class lstPackageDiscountDao {
    results: Packagediscount[];
    rowCount: number;
}


