
export class VehicleTrackingResponse
{
    status: boolean;
    message: string;
    trackingdto : VehicleTrackingDao;
}

export class VehicleTrackingDao {
   
    number: number;
    lstPolyLines:TrackingPolyGon[];
}

export class TrackingPolyGon {
     positionLatitude: number;
     positionLongitude: number;
}