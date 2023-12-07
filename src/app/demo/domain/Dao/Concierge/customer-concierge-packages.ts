import { Customer } from "../Customers/customer";
import { ConciergePackages } from "./concierge-packages";

export class CustomerConciergePackages {
    id:string;
    customer:Customer=new Customer();
    concierge_Packages:ConciergePackages= new ConciergePackages();
    is_Utilized:number;
    expiry_date:string;
}
export class CustomerConciergePackageResponse {
    result: boolean;
    status: string;
    message: string;
    data: CustomerConciergePackageListDao;
}

export class CustomerConciergePackageListDao {
    results: CustomerConciergePackages[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}