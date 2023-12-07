import { SpecialOfferDao } from "./SpecialOfferDao";

export class SpecialOfferResponse {
    result: boolean;
    status: string;
    message: string;
    data: SpecialOfferListDao;
}

export class SpecialOfferListDao {
    results: SpecialOfferDao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}