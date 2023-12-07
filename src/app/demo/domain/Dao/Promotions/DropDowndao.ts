export class DropDownResult
{
    message:string;
    result: DropDownDao;
    status:boolean;
}

export class DropDownDao{
    lstCountries: Countrydao[];
    lstCities: Citydao[];
}

export class Countrydao{
    label:string;
    value:string;
}
export class Citydao{
    label:string;
    value:string;
}

