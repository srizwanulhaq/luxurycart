import { Customerdao } from "../Customer/Customerdao";

export class VehicleRentResponse{
    status: boolean;
    message: string;
    lstVhclRequestDto: VehicleRentlstdao;
}

export class VehicleRentlstdao {
    data: VehicleRentRequestDao[];
    totalCount: number;
}

export class VehicleRentRequestDao {
    id:string;
    customer: Customerdao;
    vehicles_Rent_Status: Vehicles_Rent_Status;
    noOfDays: number;
    noOfScooters:number;
    deliveryTime: string;
    deliveryDate: string;
    deliveryAddress: string;
    requestedLocation: string;
    locationLatitude: number;
    locationLongitude: number;
    pickupLocation: string;
    pickupLocLat: number;
    pickupLocLng: number;
    createdAt: Date;

}
export class Vehicles_Rent_Status {
    id:string;
    title:string;
    number:number;
}