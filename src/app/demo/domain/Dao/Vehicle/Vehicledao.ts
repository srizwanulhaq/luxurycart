import { VehicleLocationdao } from "./VehicleLocationdao";

export class Vehicledao {
    id: string;
    number: string;
    vehicleBattery: number;
    lastBatteryReplaced: string
    batterylowStatus: string
    travelLimit: number;
    vehicleLocation: VehicleLocationdao;
    updateLocation: boolean;
    standbyTime: number;
    runningTime: number;
    update_Parking_Zone:boolean;
    update_Battery:boolean;
}
