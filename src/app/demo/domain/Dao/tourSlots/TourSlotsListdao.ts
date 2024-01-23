
import { TourSlots } from "./TourSlots";

export class TourSlotResponse {
    result: boolean;
    status: string;
    message: string;
    data: TImeSlotslistDao;
}

export class TImeSlotslistDao {
    results: TourSlots[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

