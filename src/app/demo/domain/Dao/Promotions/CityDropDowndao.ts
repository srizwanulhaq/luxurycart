export class CityDropDownResult
{
    message:string;
    result: CityDropDownDao;
    status:boolean;
}

export class CityDropDownDao{
    lstCities: Citydao[];
}

export class Citydao{
    name:string;
    id:string;
    country_Id:string;
}
export class CityDao{
    name:string;
    id:string;
}

