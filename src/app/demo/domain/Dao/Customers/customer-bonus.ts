export class CustomerBonus {
    id: string;
    customerId: string;
    customers:Customers;
    bonus_Amount:number;
    description:string;
    active: boolean;
    created_at:Date;
    update_at : Date;

}
export class Customers
{
    id?:string;
    fullName:string;
    phoneNumber:string;
}
export class AdminCustomerGLBLoad2 {
    transaction_Modes: TransactionModedao[];
    bonus_Types: BonusTypeDao[];
    wallet_Packages:WalletPackagesDao[];
}
export class TransactionModedao {
    id: string;
    title: string;
    number: number;
}

export class BonusTypeDao {
    id: string;
    title: string;
    number: number;
}
export class WalletPackagesDao {
    id: string;
    title: string;
    top_Up_Amount: number;
    bonus_Amount: number;
}

export class TransactionModesRoot {
    result: boolean;
    status: string;
    message: string;
    data: AdminCustomerGLBLoad2;
}


