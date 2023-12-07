import { SelectItem } from "primeng/api";

export class RolesDao {
    id: string;
    name: string;
    normalizedName: string;
    concurrencyStamp: Date;
    Selected: boolean;
}

export class RolesOrUserRespDropDownDao {
    message: string;
    status: boolean;
    data: SelectItem[];
}

