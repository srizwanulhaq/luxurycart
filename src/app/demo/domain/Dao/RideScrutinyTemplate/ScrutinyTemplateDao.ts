export class RideScrutinyTemplateDao {
    id: number
    title: string
    body: string
    active: boolean
    created_at: Date
}

export class RideScrutinyTemplateList {
    ride_scrutiny_templates: RideScrutinyTemplateDao[]
    total_count: number
}

export class RideScrutinyTemplateListResponse {
    data: RideScrutinyTemplateList
    status: boolean
}
