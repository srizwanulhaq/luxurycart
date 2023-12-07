import { VehicleLocationdao } from "../Vehicle/VehicleLocationdao";

export class RideTrack {
    status: boolean;
    message: string;
    vehiclesto: Vehiclesto;
}

export class Vehiclesto {

    id: string;
    number: string;
    vehicle_Location: VehicleLocationdao;
    last_Updated_Time: number;
    time_Status: Date;
}

export interface VehicleLocationDto
{
    id?:string;
    vehicle_Id: string;
    latitude: number;
    longitude: number;
}
export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    visible: boolean;
    opacity: number;
    number: string;
  }