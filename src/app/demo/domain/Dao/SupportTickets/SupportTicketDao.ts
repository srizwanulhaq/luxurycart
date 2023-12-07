import { Vehicledao } from "../Vehicle/Vehicledao"
import { SupportTicketStatusDao } from "./SupportTicketStatusDao"
import { SupportUserDao } from "./SupportUserDao"
import { TicketIssueTypeDao } from "./TicketIssueTypeDao"

export class SupportTicketListResponse {
    status: string
    message: string
    data: ListSupportTickets
}

export class ListSupportTickets {
    results: SupportTicketDao[]
    rowCount: number
}

export class SupportTicketDao {
    id: string
    title: string
    ticket_Number: number
    message: string
    current_Location: string
    loc_Latitude: number
    loc_Longitude: number
    created_at: Date
    support_Ticket_Status: SupportTicketStatusDao
    ticket_Issue_Type: TicketIssueTypeDao
    vehicle: Vehicledao
    customer: SupportUserDao
    user_Id:string;
}
export class UserDetailsdao{
    username: string;
    phone: string;
    email:string;

}

export class UserDetailsdaoResult
{
    message:string;
    userDetails: UserDetailsdao;
    status:boolean;
}
