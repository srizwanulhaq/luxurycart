
export class CustomerDetailsDto {
    totalRidesCost:number;
    totalTopUp:number;
    hightest_Paid_ride:number;
    current_Bonus_Amount:number;
    total_Wallet_Amount:number;
    total_Bonus_Amount:number;
    debit_Amount:number;
    current_Wallet_Amount:number;
}

export class CustomerDetailsDtoResult
{
    message:string;
    customerDetails: CustomerDetailsDto;
    status:boolean;
    countryCurrency:string;
}