import { SelectItem } from "primeng/api";

export class UserDropDownResult
{
    message:string;
    result: UserDropDownDao;
    status:boolean;
}

export class UserDropDownDao{
    lstRoles:SelectItem[];
    lstSubAccounts: SelectItem[];
    lstUsers: SelectItem[];
}
