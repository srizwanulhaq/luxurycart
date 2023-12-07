

export class VehiclePendingCommandDao{

    command_Name:string

}

export class PendingCommandResult
{
    message:string;
    pendingCommands: VehiclePendingCommandDao[];
    status:boolean;
}



