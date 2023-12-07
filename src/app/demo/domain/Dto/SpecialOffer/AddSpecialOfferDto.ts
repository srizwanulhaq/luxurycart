export class AddSpecialOfferDto {

    title:string;
    parkingZoneId:string;
    amount:number;
    is_Offer_Expiry:boolean;
    expire_With_Offer:boolean;
    expiry_Date: Date;
    valid_Days:number;
    offer_Purchase_Limit:number;
    total_Free_Rides:number;
    total_Ride_Minutes:number;
}
