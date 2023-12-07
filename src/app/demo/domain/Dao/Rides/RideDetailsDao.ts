export class RideDetailsDao {

    totalRides:number;
    currentDebit:number;
    currentWallet:number;
    totalCost:number;
    discountAmount:number;
}



export class RideDetailsdaoResult
{
    message:string;
    rideDetails: RideDetailsDao;
    status:boolean;
    countryCurrency:string;
}