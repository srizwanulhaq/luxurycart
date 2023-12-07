import { ActivationEnd } from '@angular/router';
import { Vehicles } from '../Vehicle/Vehicles';


export class Parking_Zones {
    id?: string;
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
    zone_Coordinates: Zone_Coordinates[];
    lstVehicle_Locations: Vehicle_Locations[];
    min_Wallet_Balance:number;
    rideEnd_WithIn_Zone:boolean;
    nearby_RedZone:boolean;
    default_Speed:number;
    segway_Throttle_Command:boolean;
}


export class Zone_Coordinates {
    id?: string;
    sequence:number;
    parking_Zone_Id?: string;
    parking_Zone: Parking_Zones;
    latitude: number;
    longitude: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}


export class Vehicle_Locations {
    id?:string;
    Vehicle_Id?: string;
    Vehicle: Vehicles;
    Latitude: number;
    Longitude: number;
    created_at: Date;
    updated_at: Date;
}













