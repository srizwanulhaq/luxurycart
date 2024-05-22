import { VehicleTypeDto } from "../../Dto/Vehicles/VehicleDto";
import { Parking_Zones } from "../Zone/Parking_Zones";

export class Projects {
    projectName:string;
    arabicName:string;
    lstZones:Parking_Zones[];
    created_at:string;
    active:boolean;
    lstVehicleTypes:Project_vehicle_Type[];
}
export class Project_vehicle_Type {
    vehicle_Type:VehicleTypeDto;
    
}
export class ProjectResponse {
    result: boolean;
    status: string;
    message: string;
    data: ProjectListDao;
}

export class ProjectListDao {
    results: Projects[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
export class SimpleProjectDao {
    id: string;
    title: string;
}
