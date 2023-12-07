import { Customerdao } from "../Customer/Customerdao";


export class RidesVehicleHistoryResponse
{
    status: boolean;
    message: string;
    historydto : RidePath;
}

export class RidePath {
    id: string ;
    number: number;
    startTime: string;
    usedMin: number;
    customer: Customerdao;
    lstPolygons:RidePolyGon[];
    lstPolygons2:RidePolyGonSegway[];
}

export class RidePolyGon {
     positionLatitude: number;
     positionLongitude: number;
}
export class RidePolyGonSegway {
    positionLatitude: number;
    positionLongitude: number;
}