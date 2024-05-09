export class VehicleTypedao {
    id?: string;
    vehicle_Type_AutoId:string;
    title: string;
    seatingCapacity:number;
    maxSpeed:number;
    duration:number;
    ticketPrice:number;
    drive_Mode:Drive_Mode;
    active: boolean
    number: number;
    created_at: Date
}

export class VehicleTypeListResponse {
    data: {
        vehicle_types: VehicleTypedao[]
        total_numer: number
    }
    status: boolean
}

export class Drive_Mode {
    id?: string;
    title: string;
    active: boolean
    created_at: Date
}
export class DriveModeDropDownResponse {
    message: string;
    data: DriveModeDropDown[];
    status: boolean;
}
export class DriveModeDropDown {
    label:string;
    value:string;
}
export class VehicleTypeDropDown {
    label:string;
    value:string;
    maxSpeed:number;
}

