import { Customerdao } from "../Customer/Customerdao";
import { ParkingZonedao } from "../ParkingZone/ParkingZonedao";
import { Vehicledao } from "../Vehicle/Vehicledao";


export class CustomerRideListto {
    data: CustomerRideList[];
    totalCount: number;
}

export class CustomerRideListResponse {
    status: boolean;
    message: string;
    ridedto: CustomerRideListto;
}

export class CustomerRideList {
    id: string;
    tripId: number;
    sourceLatitude: number;
    sourceLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    platform: number;
    end_Platform: number;
    customer_Id: string;
    phoneNumber: string;
    customer: Customerdao;
    vehicle: Vehicledao;
    parking_Zones: ParkingZonedao;
}
