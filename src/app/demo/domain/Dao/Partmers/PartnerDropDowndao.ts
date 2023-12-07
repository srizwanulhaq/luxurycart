export class PartnerDropDownResult
{
    message:string;
    result: PartnerDropDownDao;
    status:boolean;
}

export class PartnerDropDownDao{
    lstPartnerNames: PartnerNameDao[];
    lstPartnerZones: PartnerZonesDao[];
}

export class PartnerNameDao{
    label:string;
    value:string;
}

export class PartnerZonesDao{
    label:string;
    value:string;
    partner_Id:string
}



