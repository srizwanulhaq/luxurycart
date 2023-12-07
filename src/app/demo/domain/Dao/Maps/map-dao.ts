import { IOT } from "../IOT/IOTdao";
import { VehicleCompanies } from "../Zone/NewZoneDao";
import { Parking_Zones, Vehicle_Locations } from "../Zone/Parking_Zones";

export class MapsDao{
    vehicles:Vehicles[];
    parking_Zones: Parking_Zones[];
}

export class MapsResponse{
    status:string;
    message:string;
    result:boolean;
    mapsto:MapsDao;

} 

export class Vehicles {
    id: string;
    number: number;
    vehicle_Status_Id: string;
    vehicle_Status: Vehicle_Status;
    vehicle_Model_Id: string;
    vehicle_Models: Vehicle_Models;
    sub_Account_Id: string;
    sub_Accounts: Sub_Accounts;
    vehicle_Battery: number;
    last_Updated_Time: number;
    travel_Limit: number;
    ioT_Id: string;
    iot: IOT;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    vehicle_Company_Id: string;
    vehicle_Company: VehicleCompanies;
    vehicle_Locations: Vehicle_Locations;
    Parking_Zones: Parking_Zones[];
}

export class Vehicle_Status {

    id?: string;
    title: string;
    number: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    iconUrl:string;
}

export class Vehicle_Models {
    id?: string;
    vehicle_Type_Id?: string;
    name: string;
    no: number;
    max_Distance: number;
    fixed_Start_Price: number;
    time_Price: number;
    price_Per_Kilometer: number;
    max_Day_Price: number;
    default_Speed: number;
    image: string;
    isMinute: boolean;
    vehicleTypeNumber: number;
    subAccountNumber: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    sub_Accounts: Sub_Accounts;
    vehicle_Type: Vehicle_Types;
    vehicleMapIcon: string;
    specificBattery: number;
}
export class Sub_Accounts {

    id?: string;
    title: string;
    number: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}
export class Vehicle_Types {

    id?: string;
    title: string;
    number: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;

}