import { Vehicle_Types } from "../../Dao/Maps/map-dao";
import { Projects } from "../../Dao/Projects/projects";
import { Citydao, CityDao } from "../../Dao/Promotions/CityDropDowndao";
import { RideScrutinySettings } from "../../Dao/Zone/EditZoneDao";
import { Ridetype, VehicleCompanies, Zone_Coordinates } from "../../Dao/Zone/NewZoneDao";


export class Parking_ZonesDto {
    id?: string;
    zone_AutoId:string;
    title: string;
    arTitle: string;
    zone_Start_Time: string;
    zone_End_Time: string;
    number: number;
    center_Latitude: number;
    center_Longitude: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    min_Wallet_Balance:number;
    rideEnd_WithIn_Zone:boolean;
    nearby_RedZone:boolean;
    default_Speed:number;
    segway_Throttle_Command:boolean;
    zone_Coordinates: Zone_Coordinates[];
    vehicle_Types:Vehicle_Types[];
    projects:Projects;
    ride_Fare_SettingList: RideFareSettingDto[];
    zone_Type:ZoneTypeDto;
    city:Citydao;
    ride_Scrutiny_SettingList: RideScrutinySettings[];
}
export class RideFareSettingDto
{
    vehicleCompany: VehicleCompanies;
    rideType: Ridetype;
    rideTypeId:string;
    vehicleCompanyId:string;
    fixed_Start_Price:number;
    time_Price:number;
    price_Per_Kilometer:number;
    paused_Time_Price:number;
}
export class ZoneTypeDto{
    id: string;
    title: string;
    number: number;
}



export class ParkingZonesResponse {
    result: boolean;
    status: string;
    message: string;
    data: ParkingZonesListDao;
}

export class ParkingZonesListDao {
    results: Parking_ZonesDto[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}


















