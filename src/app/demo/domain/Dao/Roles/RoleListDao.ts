import { PermissionListDao } from "../Permission/PermissionListDao";
import { RolesDao } from "./RolesDao";

export class RoleListDao{
    results: RolesDao[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}

export class RoleListResponseDao{
    status:boolean;
    message:string;
    data: RoleListDao;
    permissions: PermissionListDao;
}