export class VehicleFilterResponse{
    status: boolean;
    message: string;
    lstVhclDto: VehicleFilterdao[];
}

export class VehicleFilterdao{
    id:string;
    number: string;
}
