export class ActivityLoggingResponse {
    status: string
    message: string
    activitydao: ActivityLoggings
}

export class ActivityLoggings {
    data: ActivityLoggingDao[]
    totalCount: number
}

export class ActivityLoggingDao {
    id: string
    title: string
    message: string
    action: string
    route: string
    customData: string
    read: boolean
    created_at: Date
}
