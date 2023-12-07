import { OfferParkingZoneDao } from "./OfferParkingZoneDao";


export class SpecialOfferDao {

    id:string;
    title:string;
    parking_Zones:OfferParkingZoneDao;
    amount:number;
    is_Offer_Expiry:boolean;
    expire_With_Offer:boolean;
    expiry_Date: Date;
    valid_Days:number;
    offer_Purchase_Limit:number;
    total_Free_Rides:number;
    total_Ride_Minutes:number;
    create_at:Date;
}



