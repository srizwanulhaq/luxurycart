
import { TourSlots } from "./TourSlots";

export class TourSlotResponse {
    result: boolean;
    status: string;
    message: string;
    data: VehicleListDao;
}

export class VehicleListDao {
    results: TourSlots[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

