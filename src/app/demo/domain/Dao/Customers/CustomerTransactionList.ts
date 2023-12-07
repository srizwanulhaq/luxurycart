import { Customerdao } from "../Customer/Customerdao";
import { TransactionCategory, TransactionMode, TransactionType } from "../Transaction/transactiondao";


export class CustomerTransactionListto {
    data: CustomerTransactionList[];
    totalCount: number;
}

export class CustomerTransactionListResponse {
    status: boolean;
    message: string;
    transactiondto: CustomerTransactionListto;
}

export class CustomerTransactionList {
    id:string;
    amount:number;
    createdAt: Date;
    transactionTypes: TransactionType; 
    transactionModes: TransactionMode;
    transactionCategories: TransactionCategory;
    customers: Customerdao;
}
