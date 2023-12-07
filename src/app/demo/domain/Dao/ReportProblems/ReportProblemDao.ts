import { Customerdao } from "../Customer/Customerdao"

export class ReportProblemListResponse {
    status: string
    message: string
    reportproblemsto: ListReportProblems
}

export class ListReportProblems {
    data: ReportProblemDao[]
    totalCount: number
}

export class ReportProblemDao {
    id: string
    customer_Id?: string
    customers: Customerdao
    email: string
    problem_Desc: string
    brand: string
    model_Number: string
    oS_Version: string
    last_Report_Id: string
    total_Customer_Problem: number
    image?: string
    active: boolean
    latitude?: number
    longitude?: number
    created_at: Date
    updated_at: Date
}
