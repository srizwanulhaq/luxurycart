import { Customer } from "../Customers/customer";
import { Insurance } from "../Insurance/insurance";

export class Customer_Insurance {
    id:string;
    title:string;
    arTitle:string;
    customerId:string;
    customers:Customer = new Customer();
    insuranceId:string;
    insurance:Insurance= new Insurance();
    is_Refund:boolean;
    isPaid:boolean;
    active:boolean;
    refund_Amount:number;
    final_Amount:number;
    created_at:string;
    updated_at:string;
    invoiceId:number;
}


export class CustomerInsuranceResponse {
    result: boolean;
    status: string;
    message: string;
    data: CustomerInsuranceListDao;
}

export class CustomerInsuranceListDao {
    results: Customer_Insurance[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
