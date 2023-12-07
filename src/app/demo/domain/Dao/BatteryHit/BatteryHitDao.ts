export type BatteryHitListResponse = {
    status: string
    message: string
    data: ListBatteryHits
}

export type ListBatteryHits = {
    results: BatteryHitDao[]
    rowCount: number
}

export type BatteryHitDao = {
    commandCount: number
    userId: string
}
