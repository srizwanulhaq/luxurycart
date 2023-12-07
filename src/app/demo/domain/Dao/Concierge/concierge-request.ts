import { BoothDto } from "../../Dto/Booth/BoothDto";
import { Customer } from "../Customers/customer";
import { ConciergePackages } from "./concierge-packages";
import { RequestStatus } from "./request-status";

export class ConciergeRequest {
    id:string;
    customer:Customer=new Customer();
    Concierge_Request_Status:RequestStatus= new RequestStatus();
    Concierge_Booth_From:BoothDto= new BoothDto();
    Concierge_Booth_To:BoothDto= new BoothDto();
    Customer_Concierge_Packages:ConciergePackages= new ConciergePackages();
    Order_Id:number;
}
export class ConciergeRequestResponse {
    result: boolean;
    status: string;
    message: string;
    data: ConciergeRequestListDao;
}

export class ConciergeRequestListDao {
    results: ConciergeRequest[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}