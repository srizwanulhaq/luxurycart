import { PermissionDto } from "./PermissionDto";

export interface UpdatePermissionDto
{
    roleId:string;
    moduleId:string;
    permission: PermissionDto;
}

