import { TourPointSlotsListComponent } from "src/app/demo/view/TourPointSlot/tour-point-slots-list/tour-point-slots-list.component";
import { Customer } from "../Customers/customer";
import { PointSlotDto } from "../../Dto/PointSlots/PointSlotDto";
import { Packages } from "./packages";

export class TourCustomerPurchase {
    customer_Id :string;
    Customers:Customer;
    Tour_Point_Slot_Id:string;
    Tour_Point_Slot :PointSlotDto;
    Tour_Slot_Package_Id:string;
    Tour_Slot_Package:Packages;
    active:boolean;
    isPaid:boolean;
    qty:number;
    total_Amount:number;
    amount:number;
    created_at:string;
}


export class TourCustomerPurchaseResponse {
    result: boolean;
    status: string;
    message: string;
    data: TourCustomerPurchaseListDao;
}

export class TourCustomerPurchaseListDao {
    results: TourCustomerPurchase[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}