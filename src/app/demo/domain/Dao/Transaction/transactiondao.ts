 

export class Transactionlstdao {
    data: Transactiondao[];
    totalCount: number;
    total_credit: number;
    total_debit: number;
}

export class TransactionResponse {
    status: boolean;
    message: string;
    transactiondto: Transactionlstdao;
}

export class Transactiondao {
    id:string;
    amount:number;
    createdAt: Date;
    transactionTypes: TransactionType; 
    transactionModes: TransactionMode;
    transactionCategories: TransactionCategory;
    customers: Customers;
    customer_Id:string;
    serial_No:number;
    isScan:boolean;
}
export class TransactionListDao {
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

export class TransactionType
{
    id:string;
    title:string;
    number:number;
}

export class TransactionMode{
    id:string;
    title:string;
    number:number;
}

export class TransactionCategory{
    id:string;
    title:string;
    number:number;
}
export class Customers
{
    id?:string;
    fullName:string;
    phoneNumber:string;
}


export class TransactionResponseV2 {
    result: boolean;
    status: string;
    message: string;
    data: TransactionListDaoV2;
}

export class TransactionListDaoV2 {
    results: Transactiondao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
    total_Credit: number;
    total_Debit: number;
}