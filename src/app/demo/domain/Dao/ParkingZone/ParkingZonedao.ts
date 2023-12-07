export class ParkingZonedao {

    id?: string;
    title: string;
    arTitle: string;
    number: number;
    center_Latitude: number;
    center_Longitude: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class ZoneListResponse {
    status: string
    message: string
    data: data
    result: boolean
}

export class data {
    result: SimpleZoneDao[]
}

export class SimpleZoneDao {
    id: string;
    title: string;
}

