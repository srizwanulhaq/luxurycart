export class ConciergePackages {
    title:string;
    amount:number;
    total_Bags:number;
    is_Unlimited:number;
    created_at:string;
    active:boolean;
}
export class ConciergePackageResponse {
    result: boolean;
    status: string;
    message: string;
    data: ConciergePackageListDao=new ConciergePackageListDao();
}

export class ConciergePackageListDao {
    results: ConciergePackages[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}