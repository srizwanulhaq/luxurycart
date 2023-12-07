export class VehicleTypedao {
    id?: string;
    title: string;
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
