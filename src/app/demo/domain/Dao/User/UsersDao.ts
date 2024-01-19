import { UserRoleDto } from "./UserRoleDto";
import { UserSubAccountDto } from "./UserSubAccountDto";

export class UsersDao {
    id: string;
    email: string;
    username: string;
    password: string;
    parentId: string;
    roles: UserRoleDto;
    subAccount: UserSubAccountDto;
    selectedVehicles: string[];
    selectedProjects: string[];
    selectedZones: string[];
    vehicles: string[];
    zones: string[];
    projects:string[];
}
