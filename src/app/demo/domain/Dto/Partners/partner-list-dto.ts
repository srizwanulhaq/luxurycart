import { PartnerDto } from "./partner-dto";

export class PartnerListDto {
    results: PartnerDto[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
