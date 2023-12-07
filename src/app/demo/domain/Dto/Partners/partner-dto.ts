import { CityDao } from "../../Dao/Cities/CityDao";
import { CountryDao } from "../../Dao/Countries/CountryDao";
import { ParkingZonedao } from "../../Dao/ParkingZone/ParkingZonedao";

export class PartnerDto {

    Id:string;
    Name:string;
    Share:number;
    VAT:Boolean;
    End_Date:Date;
    Start_Date:Date;
    Created_at:Date;
    city:CityDao;
    country:CountryDao;
    zone_PartnersList:ZonePartnersDao[];
}
export class ZonePartnersDao{

    parking_Zone:ParkingZonedao;
}