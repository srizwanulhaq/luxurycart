import { IOTdao } from "../IOT/IOTdao";
import { ParkingZonedao } from "../ParkingZone/ParkingZonedao";
import { SubAccountdao } from "../SubAccount/SubAccountdao";
import { VehicleCompanydao } from "./VehicleCompanydao";
import { VehicleLocationdao } from "./VehicleLocationdao";
import { VehicleModeldao } from "./VehicleModeldao";
import { VehicleStatusdao } from "./VehicleStatusdao";
import { VehicleStatusMessagedao } from "./VehicleStatusMessagedao";
import { VehicleTrackingStatusdao } from "./VehicleTrackingStatusdao";
import { VehicleTypedao } from "./VehicleTypedao";

export class Vehicles {

    id: string;
    number: string;
    vehicleBattery: number;
    lastUpdatedTime: number;
    updateLocation: boolean;
    travelLimit: number;
    time_Status: Date;
    vehicleStatus: VehicleStatusdao
    vehicleCompany: VehicleCompanydao;
    vehicleTypes: VehicleTypedao;
    vehicleModel: VehicleModeldao;
    iot: IOTdao;
    subAccount: SubAccountdao;
    vehicleTrackingStatus: VehicleTrackingStatusdao;
    vehicleStatusMessages: VehicleStatusMessagedao;
    parkingZones: ParkingZonedao;
    vehicleLocation: VehicleLocationdao;
    standbyTime: number;
    runningTime: number;
    update_Parking_Zone:boolean;
    update_Battery:boolean;
}
