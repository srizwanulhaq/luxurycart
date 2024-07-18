export class EventTicketType {
    id:string;
    name:string;
    price:number;
    active:boolean;
    created_at:string;
}
export class EventTicketTypeResponse {
    result: boolean;
    status: string;
    message: string;
    data: EventTicketTypeListDao;
}

export class EventTicketTypeListDao {
    results: EventTicketType[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
