


export class BoothDto {
    id?: string;
    title: string;
    latitude: number;
    longitude: number;
    waitTime:number;
    active: boolean;
    created_at: Date;
    boothType:BothTypeDto;
    lstBoothManagers: BoothManagerDto[];

}
export class BothTypeDto{
    id: string;
    title: string;
}

export class BoothResponse {
    result: boolean;
    status: string;
    message: string;
    data: BoothListDao;
}

export class BoothListDao {
    results: BoothDto[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

export class BoothManagerDto{

     id:string;
     
}


















