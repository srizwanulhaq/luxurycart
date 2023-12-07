
export class IOTDropDownDaoResult
{
    message:string;
    result: IOTDropDownDao;
    status:boolean;
}

export class IOTDropDownDao{
    lstModels: IModeldao[];
    lstAccounts: IAccountsdao[];
}
export class IModeldao{
    label:string;
    value:string;
}
export class IAccountsdao{
    label:string;
    value:string;
}