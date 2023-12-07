import { DynamicPermissionRepsonseDto } from "../DynamicPermission/DynamicPermissionDao";
import { UserDropDownDao } from "./UserDropDownsDao";

export class UserFormDao
{
    message:string;
    data: UserFormDaoValues;
    status:boolean;
}

export class UserFormDaoValues{
    result:UserDropDownDao;
    dynVal: DynamicPermissionRepsonseDto;
}
