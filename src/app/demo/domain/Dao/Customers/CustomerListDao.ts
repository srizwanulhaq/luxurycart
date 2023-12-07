

import {Customer } from "./customer";

export class CustomerResponse {
    result: boolean;
    status: string;
    message: string;
    data: CustomerListDao;
}

export class CustomerListDao {
    results: Customer[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}