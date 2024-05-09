export class TicketType {
    id:string;
    title:string;
    project_Id:string;
    vehicle_Type_Id:string;
    ticket_Price:number;
    created_at:string;
}
export class TicketTypeResponse {
    result: boolean;
    status: string;
    message: string;
    data: TicketTypeDao;
}

export class TicketTypeDao {
    results: TicketType[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}