

export class PartnerRevenueDto {


    total_Amount:number;
    amount_VAT:number;
    partner_Share:number;
    partner_Amount:number;
    period:string;
    lstMonthlyRevenue:RevenueMonthStats[];
    lstYearlyRevenue:RevenueYearStats[];
    lstWeeklyRevenue:RevenueWeekStats[];
    quarterlyRevenue:RevenueQuarterlyStats;
}

export class RevenueWeekStats{
    total:number;
    month:number;
    monthName:string;
    year:number;
    week:number;
}
export class RevenueQuarterlyStats{
   q1:RevenueDto[];
   q2:RevenueDto[];
   q3:RevenueDto[];
   q4:RevenueDto[];
}

export class RevenueDto {
    name:string;
    total:number;
}

export class RevenueMonthStats
{
    year:number;
    month:number;
    monthName:string;
    total:number;
}

export class RevenueYearStats{
    year:number;
    total:number
}
