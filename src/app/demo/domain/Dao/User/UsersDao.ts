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
    selectedZones: string[];
    vehicles: string[];
    zones: string[];
}
