import { PointSlotDto } from "./PointSlotDto";

export class PointSlotListDto {
    results: PointSlotDto[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
