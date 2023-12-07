
export class TransactionDetailsDto {
    amount:number;
    currentDebit:number;
    currentWallet:number;
}

export class TransactionDetailsDtoResult
{
    message:string;
    transDetails: TransactionDetailsDto;
    status:boolean;
    countryCurrency:string;
}