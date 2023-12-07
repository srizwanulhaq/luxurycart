import { CityPromoCodeDao } from "../../Dao/OffesCodes/CityPromoCodeDao";

export class EditPromoCodeDto {
    id:string;
    code:string;
    quantity:number;
    per_Usage:number;
    credits:number;
    start_Date:Date;
    end_Date:number;
    is_New_User:boolean;
    title:string;
    package_Id:string;
    parking_Zone_Id:string;
    lstCityPromoCodes:CityPromoCodeDao[]
}

