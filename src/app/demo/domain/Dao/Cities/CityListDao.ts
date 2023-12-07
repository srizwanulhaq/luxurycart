import { City } from "./City";



export class CityResponse {
    result: boolean;
    status: string;
    message: string;
    data: CityListDao;
}

export class CityListDao {
    results: City[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

