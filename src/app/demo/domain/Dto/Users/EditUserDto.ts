export interface EditUserDto
{
    userId?:string;
    email?:string;
    password?:string;
    roleId?:string;
    subAccountId?:string;
    parentId:string;
}