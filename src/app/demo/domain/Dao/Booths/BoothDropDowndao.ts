import { SelectItem } from "primeng/api";

export class BoothDropDownResult
{
    message:string;
    data: BoothDropDownDao;
    status:boolean;
}

export class BoothDropDownDao{
    lstUsers: SelectItem[];
    lstBoothTypes: SelectItem[];
}




