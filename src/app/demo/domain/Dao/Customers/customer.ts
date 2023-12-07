
import { CustomerBonus } from "./customer-bonus";
import { CustomerCards } from "./customer-cards";
import { CustomerWallet } from "./customer-wallet";
import { Documents } from "./documents";


export class Customer {

    data: AdminCustomerListDAO[];
    totalCount: number;
}
export class AdminCustomerListDAOResponse {
    status: boolean;
    message: string;
    customerto: Customer;
}
export class AdminCustomerListDAO {
    id?: string;
    full_Name?: string;
    image?: string;
    phone?: string;
    email: string;
    Username?: string;
    created_at: Date;
    updated_at: Date;
    active: boolean;
    group_Ride_Eligibility: boolean;
    documents: Documents;
    customer_Wallet: CustomerWallet;
    isCustomerWallet: number;
    customer_Cards: CustomerCards;
    customer_Bonus:CustomerBonus;
    isCustomerBonus: number;
    is_Primary_Card:boolean;
    isPrimaryCard:number;
    ridesCount:number;
    isRidesCount:number;
    totalRidesCost:number;
    isTotalRidesCost:number;
    totalTopUp:number;
    isTotalTopUp:number;
    customerStatusNumber:Number;
    latitude:number;
    longitude:number;
}
export class CustomerStatus {

    id?: string;
    title: number;
    number: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}


