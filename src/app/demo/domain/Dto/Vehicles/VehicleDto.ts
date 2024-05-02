export interface VehicleDto {
    number: string;
}

export class VehicleCompanyDto {
    name: string
    number: number
}

export class VehicleTypeDto {
    title: string
    vehicle_Type_AutoId:string;
    seatingCapacity:number;
   // maxSpeed:number;
    drive_Mode_Id:string;
    number: number
}
