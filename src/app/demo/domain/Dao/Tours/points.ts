export class Points {
    name:string;
    name_AR:string;
    created_at:string;
    active:boolean;
}


export class PointResponse {
    result: boolean;
    status: string;
    message: string;
    data: PointListDao;
}

export class PointListDao {
    results: Points[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

