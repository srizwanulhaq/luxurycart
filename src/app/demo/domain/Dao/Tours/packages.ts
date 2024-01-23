
export class Packages {
    name:string;
    amount:number=0;
    created_at:string;
    active:boolean;
}

export class PackageResponse {
    result: boolean;
    status: string;
    message: string;
    data: PackageListDao;
}

export class PackageListDao {
    results: Packages[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

