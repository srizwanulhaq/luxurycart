import { Currency } from "./Currency";


export class CurrencyResponse {
    result: boolean;
    status: string;
    message: string;
    data: CurrencyListDao;
}

export class CurrencyListDao {
    results: Currency[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

