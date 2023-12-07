export class DropDownResult
{
    message:string;
    result: DropDownDao;
    status:boolean;
}

export class DropDownDao{
    lstCurrencies: Currecydao[];
}

export class Currecydao{
    label:string;
    value:string;
}


