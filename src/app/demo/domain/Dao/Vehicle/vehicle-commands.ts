
export class Vehiclecommands {
    id: string;
    title: string;
    number: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    buttonTitle: string;
    isInputValue: boolean;
    inputValue: string;
}

export class CommandsResponse {
    status: boolean;
    message: string;
    vehicleCommanddto: Commandlstdao;
}

export class Commandlstdao {
    data: Vehiclecommands[];
    totalCount: number;
}

export class VehicleCommandDao {
    title: string;
    number: number;
    value?: any
}

export class GetAllCommandsResp {
    status: boolean
    message: string
    data: VehicleCommandDao[]
}
