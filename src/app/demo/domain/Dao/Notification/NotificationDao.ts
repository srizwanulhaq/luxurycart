export class NotificationDao {
    id: number
    title: string
    message: string
    action: string
    route: string
    customData: string
    read: boolean
    created_at: Date
}

export class ActivityLogsDao {
    data: NotificationDao[]
    totalCount: number
}

export class AllNotificationsRespDao {
    status: boolean
    message: string
    activityLogs: ActivityLogsDao
}
