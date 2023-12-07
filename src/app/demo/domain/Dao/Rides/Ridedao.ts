import { Customerdao } from "../Customer/Customerdao";
import { ParkingZonedao } from "../ParkingZone/ParkingZonedao";
import { Vehicledao } from "../Vehicle/Vehicledao";
import { RideFaredao } from "./RideFaredao";
import { RideFeedbackdao } from "./RideFeedbackdao";
import { RideParkingImagedao } from "./RideParkingImagedao";
import { RidePauseTimingsdao } from "./RidePauseTimingsdao";
import { RideStatusdao } from "./RideStatusdao";

export class RidesResponse {
    status: boolean;
    message: string;
    ridedto: lstRideDao;
}

export class lstRideDao {
    data: Ridedao[];
    totalCount: number;
    activeRidecount: number;
}

export class RideTimingDao {
    id: string
    rideEndTime: Date
    rideStartTime: Date
}

export class Ridedao {
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
    rideStatus: RideStatusdao;
    rideFare: RideFaredao;
    rideFeedback: RideFeedbackdao;
    rideParkingImage: RideParkingImagedao;
    parking_Zones: ParkingZonedao;
    ride_Pause_Timings: RidePauseTimingsdao;
    rideTimings: RideTimingDao
    rideOnDebt: boolean
}
