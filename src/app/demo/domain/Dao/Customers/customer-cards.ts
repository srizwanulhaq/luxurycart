export class CustomerCards {
    id?:string;
    customer_Id?:string;
    card_Number:string;
    expiration_Date:Date;
    cVV:number; 
    token:string;
    is_Primary_Card:boolean;
    active:boolean;
    created_at:Date; 
    updated_at:Date;
}
