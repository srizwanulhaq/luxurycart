import { CountryDao } from "./CountryDao";



export class CountryResponse {
    result: boolean;
    status: string;
    message: string;
    data: CountryListDao;
}

export class CountryListDao {
    results: CountryDao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

