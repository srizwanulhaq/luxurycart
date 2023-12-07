import { SimpleZoneDao } from "../ParkingZone/ParkingZonedao"
import { ZoneStatsDao } from "../Zone/AllDropDowndao"

export class UserTrackDao {
    id: string
    userId: string
    userName: string
    latitude: number
    longitude: number
    zoneTitle: string
    is_Within_Zone: boolean
    log_Status: number
    log_DateTime: Date
    created_at: Date
}

export class UserTrackHistoryDao {
    id: string
    latitude: number
    longitude: number
    is_Within_Zone: boolean
    log_Status: number
    log_DateTime: Date
    active: boolean
    parkingZone: SimpleZoneDao
    user_Id: string
    created_at: Date
}

export class UserTrackingList {
    results: UserTrackHistoryDao[]
    rowCount: number
}

export class UserTrackDetailDao {
    user_Id: string
    userName: string
    totalOnlineMinsWithinZone: number
    totalOnlineMinsOutOfZone: number
    totalOnlineMins: number
    zoneStats: ZoneStatsDao[]
    userTrackingList: UserTrackingList
}

export class AllUserTrackResp {
    status: boolean
    message: string
    data: { result: UserTrackDao[], totalCount: number }
}

export class UserTrackDetailResp {
    status: boolean
    message: string
    data: UserTrackDetailDao
}
