export type CustomerSurveyDao = {
    id: String,
    vehicle_type: String,
    nationality: String,
    age_bracket: String,
    gender: String,
    ride_direction: String,
    quality_of_departure_zone: Number,
    quality_of_pickup_zone: Number,
    quality_of_track_floor: Number,
    quality_of_lighting: Number,
    quality_of_scooter_condition: Number,
    sustainability_of_scooter_speed: Number,
    scooter_pickup_process: Number,
    scooter_drop_off_process: Number,
    satisfied_experince: Number,
    support_provision_of_scooter: Boolean,
    is_wearing_glasses: Boolean,
    have_scooter_knowledge: Boolean,
    is_service_already_used: Boolean,
    active: Boolean,
    user_id: String,
    created_at: Date,
}

export type CustomerSurveyListResp = {
    data: { list: CustomerSurveyDao[], total_count: number },
    status: boolean
}
