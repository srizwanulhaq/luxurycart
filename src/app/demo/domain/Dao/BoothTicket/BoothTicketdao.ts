 

export class Boothlstdao {
    data: BoothTicketdao[];
    totalCount: number;
    total_credit: number;
    total_debit: number;
    
}

export class BoothResponse {
    status: boolean;
    message: string;
    transactiondto: Boothlstdao;
}

export class BoothTicketdao {
    id: string;                  
    qty: number;                
    amount: number;              
    payment_Mode: string;         
    vehicle_Type_Id: string;      
    customer_Reference: string;   
    reference_Id: string;         
    scan_By: string;              
    purchase_Date: Date;          
    created_Date: Date;           
    updated_At: Date;            
}
export class BoothListDao {
    id:string;
    amount:number;
    createdAt: Date;
    type_Title: string;
    mode_Title: string;
    category_Title: string;
    type_Number:Number;
    mode_Number:Number;
    category_Number:Number;
    customer_Name:string;
    customer_created_at:Date;
    phone:string;
    email:string;
    ridesCount:number;
    currentWallet:number;
    currentDebit:number;
    customer_Id:string;
}

// export class BoothType
// {
//     id:string;
//     title:string;
//     number:number;
// }

// export class BoothMode{
//     id:string;
//     title:string;
//     number:number;
// }

// export class BoothCategory{
//     id:string;
//     title:string;
//     number:number;
// }
// export class Customers
// {
//     id?:string;
//     fullName:string;
//     phoneNumber:string;
// }



export class BoothListDaoV2 {
    results: BoothTicketdao[];     
    currentPage: number;       
    pageCount: number;            
    pageSize: number;             
    rowCount: number;              
    isLast: boolean;               
    firstRowOnPage: number;      
    lastRowOnPage: number;      
    total_Credit: number;    
    total_Debit: number;           
}
export class BoothResponseV2 {
    result: boolean;
    status: string;
    message: string;
    data: BoothListDaoV2;
}