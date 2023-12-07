

export class VehicleParkingZonesRoot
{
    result: boolean;
    status: string;
    message: string;
    data: VehicleParkingZones[];
}

export class VehicleParkingZones {
    id: string;
    title: string;
    number: number;
}