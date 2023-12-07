
export class VehicleStatusdao {
    id?: string;
    title: string;
    number: number;
}

export class VehicleStatusDropDownResult {
    message: string;
    result: VehicleStatusDropDown;
    status: boolean;
}

export class VehicleStatusDropDown {
    lstStatuses: VStatus[];
}

export class VStatus {
    label: string;
    value: number;
}
