import { ZoneDto } from "./ZoneDto";


export class VisitPlaceDto{
    id?: string;
    title: string;
    arTitle: string;
    sub_ArTitle:string;
    sub_Title:string;
    rating:number;
    address:string;
    short_Description:string;
    long_Description:string;
    latitude:number ;
    longitude:number;
    zoneId:ZoneDto[];
    active: boolean;
    visitPlaceImagesList: visitPlaceImagesDao[]
    zoneVisitPlacesList:zoneVisitPlacesDao[]

}
export class visitPlaceImagesDao {
    image:string;
    visit_Place_Id:string;
}
export class zoneVisitPlacesDao {
    visit_Place_Id:string;
    parking_zone_Id:string;
    parkingZone:ZoneDto[];
}
export class VisitPlaceResponse {
    result: boolean;
    status: string;
    message: string;
    data: VisitPlaceListDao;
}

export class VisitPlaceListDao {
    results: VisitPlaceDto[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

