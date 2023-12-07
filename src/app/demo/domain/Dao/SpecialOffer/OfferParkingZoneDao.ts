export class OfferParkingZoneDao {
    id: string;
    title: string;
    number: number;
}

export class ParkingZoneDropDownResult
{
    message:string;
    result: ParkingZoneDropDown;
    status:boolean;
}

export class ParkingZoneDropDown
{
    lstZones: ParkingZone[];
}

export class ParkingZone{
    label:string;
    value:string;
}
