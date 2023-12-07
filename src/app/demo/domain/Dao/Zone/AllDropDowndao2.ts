export class AllDropDowndao2
{
    message:string;
    result: CityDropDownDao2;
    status:boolean;
}

export class CityDropDownDao2{
    lstcities: Citydao2[];
}

export class Citydao2{
    label:string;
    value:string;
    country_Id:string;
}