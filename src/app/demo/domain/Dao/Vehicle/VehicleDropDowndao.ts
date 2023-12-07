export class VehicleDropDownResult
{
    message:string;
    result: VehicleDropDownDao;
    status:boolean;
}

export class VehicleDropDownDao{
    lstCompanies: VCompanydao[];
    lstTypes: VTypedao[];
    lstStatuses: VStatusdao[];
    lstModels: VModeldao[];
    lstIOTs: VIOTdao[];
    lstAccounts: VAccountsdao[];
}

export class VCompanydao{
    label:string;
    value:string;
}

export class VTypedao{
    label:string;
    value:string;
}

export class VModeldao{
    label:string;
    value:string;
}

export class VIOTdao{
    label:string;
    value:string;
}

export class VStatusdao{
    label:string;
    value:string;
}

export class VAccountsdao{
    label:string;
    value:string;
}