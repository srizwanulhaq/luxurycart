import { DynamicDataDto } from "../../Dao/DynamicPermission/DynamicPermissionDao";

export interface NewUserDto
{
    email?:string;
    password?:string;
    roleId?:string;
    subAccountId?:string;
    parentId?:string;
    selectedVehicles?:string[];
    selectedProjects?:string[];
    selectedZones?:string[];
    
}