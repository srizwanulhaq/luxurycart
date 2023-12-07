export class VehicleCompanydao {
    id?: string;
    name: string;
    active: boolean
    number: number;
    standby_time: number;
    running_time: number;
    created_at: Date
}

export class VehicleCompanyListResponse {
    data: {
        vehicle_companies: VehicleCompanydao[]
        total_numer: number
    }
    status: boolean
}
