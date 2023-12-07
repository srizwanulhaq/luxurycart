import { Time } from "@angular/common";
import { RideScrutinySettingsDto } from "./NewZoneDao";


export interface EditZoneDao{
    id?: string;
    title: string;
    arTitle: string;
    zone_Start_Time: string;
    zone_End_Time: string;
    min_Wallet_Balance:number;
    rideEnd_WithIn_Zone:boolean;
    nearby_RedZone:boolean;
    default_Speed:number;
    segway_Throttle_Command:boolean;
    center_Latitude:number;
    center_Longitude:number;
    zone_Type_Id:string;
    zone_Coordinates: Zone_Coordinates[];
    ride_Fare_Setting:RideFareSetting[];
    ride_Scrutiny_Setting: RideScrutinySettings[];
    ride_Scrutiny_Setting2: RideScrutinySettings[];
    ride_Scrutiny_Setting3: RideScrutinySettings[];
    ride_Scrutiny_Setting4: RideScrutinySettings[];
    ride_Scrutiny_Setting5: RideScrutinySettings[];
    city_Id:string;
}

export class Zone_Coordinates {
    id?: string;
    sequence:number;
    parking_Zone_Id?: string;
    latitude: number;
    longitude: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}
export class Zone_CoordinatesDao {
    sequence:number;
    latitude: number;
    longitude: number;
}
export class Zone_CoordinatesDao2 {
    sequence:number;
    lat: number;
    lng: number;
}


export class RideFareSetting
{
    rideTypeId:string;
    vehicleCompanyId:string;
    vehicleCompany: VehicleCompanies;
    rideType: Ridetype;
    fixed_Start_Price:number;
    time_Price:number;
    price_Per_Kilometer:number;
    paused_Time_Price:number;
}

export class VehicleCompanies {
    id: string;
    name: string;
    number: number;

}
export class Ridetype {
    id:string;
    title:string;
    number:number;
}

export class RideScrutinySettings
{
    id:string;
    ride_Scrutiny_Templates: ScrutinyTemplate;
    templateId:string;
    totalLeftMinutes:number;
    enable24Hours:boolean;
    startTime:Time;
    endTime:Time;
    appliedDays:string;
    sendCustomerNotification:boolean;
    sendAdminNotification:boolean;
    allowRideEnd:boolean;
    turnSpeedLow:boolean;
    turnThrottleOff:boolean;
    no_Of_Rides:number;
    sequence:number;

}
export class ScrutinyTemplate {
    id:number;
    title:string;
}