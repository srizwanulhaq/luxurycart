import { IOTdao } from "../IOT/IOTdao";
import { RideParkingImagedao } from "../Rides/RideParkingImagedao";
import { SubAccountdao } from "../SubAccount/SubAccountdao";
import { VehicleLocationdao } from "./VehicleLocationdao";
import { VehicleModeldao } from "./VehicleModeldao";
import { Vehicles } from "./Vehicles";

export class VehicleResponse {
    result: boolean;
    status: string;
    message: string;
    data: VehicleListDao;
}

export class VehicleListDao {
    results: Vehicles[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

