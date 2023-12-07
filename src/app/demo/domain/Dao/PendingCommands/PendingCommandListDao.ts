import { PendingCommandDao } from "./PendingCommandDao";


export class PendingCommmandResponse {
    result: boolean;
    status: string;
    message: string;
    data: PendingCommandListDao;
}

export class PendingCommandListDao {
    results: PendingCommandDao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

