export interface PermissionListDao
{
    data: Permissions;
}

export interface Permission {
    id: string;
    name: string;
    permissionTitle:string;
    isSelected: boolean;
}

export interface PermissionModule {
    id: string;
    title: string;
    permission: Permission[];
}

export interface Permissions {
    RoleId: string;
    modules: PermissionModule[];
}