import { Time } from "@angular/common";
import { ScrutinyTemplate } from "./EditZoneDao";

export interface NewZoneDao{
    id?: string;
    title: string;
    arTitle: string;
    zone_Start_Time: string;
    zone_End_Time: string;
    min_wallet_balance:number;
    rideEnd_within_zone:boolean ;
    nearby_RedZone:boolean;
    default_Speed:number;
    segway_Throttle_Command:boolean;
    zone_Coordinates: Zone_Coordinates[];
    ride_Fare_Setting:RideFareSetting[];
    city_Id:string;
    country_Id:string;
    ride_Scrutiny_Setting: RideScrutinySettingsDto[];
    walletPackagesIds:string[];
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
export class RideFareSetting
{
    vehicleCompany: VehicleCompanies;
    rideType: Ridetype;
    fixed_Start_Price:number;
    time_Price:number;
    price_Per_Kilometer:number;
    paused_Time_Price:number;
}
export class DefaultRideFareSetting
{
    rideTypeId:string;
    vehicleCompanyId:string;
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

export class RideScrutinySettingsDto
{
    ride_Scrutiny_Templates: ScrutinyTemplate;
    totalLeftMinutes:number;
    enable24Hours:boolean;
    startTime:string;
    endTime:string;
    appliedDays:string;
    sendCustomerNotification:boolean;
    sendAdminNotification:boolean;
    allowRideEnd:boolean;
    turnSpeedLow:boolean;
    turnThrottleOff:boolean;
    no_Of_Ride:number;
   
}
export class DefaultRideScrutinySettingsDto
{
    templateId: number;
    totalLeftMinutes:number;
    enable24Hours:boolean;
    startTime:string;
    endTime:string;
    appliedDays:string;
    sendCustomerNotification:boolean;
    sendAdminNotification:boolean;
    allowRideEnd:boolean;
    turnSpeedLow:boolean;
    turnThrottleOff:boolean;
    Sequence:number;
    no_Of_Rides:number;
}