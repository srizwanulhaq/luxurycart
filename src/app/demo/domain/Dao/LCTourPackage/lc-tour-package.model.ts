import { TicketType } from "../TicketType/ticket-type.model";

export class LCTourPackage {
    id:string;
    title:string;
    no_Of_Tickets:number;
    ticket_Type_Id:string;
    ticket_Type:TicketType;
    amount:number;
    discounted_Percent:number;
    net_Amount:number;
    active:boolean;
    created_at:string;
}

export class LCTourPackageResponse {
    result: boolean;
    status: string;
    message: string;
    data: LCTourPackageDao;
}

export class LCTourPackageDao {
    results: LCTourPackage[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
export class TicketDropDown {
    label:string;
    value:string;
    price:number;
}