export type VehicleHeadCountDao = {
    vehicle_no: string,
    today: number,
    yesterday: number,
    current_month: number,
    over_all: number,
    is_set: boolean
}

export type VehicleHeadCountResponse = {
    data: {
        list: VehicleHeadCountDao[],
        total_count: number
    },
    status: boolean
}
