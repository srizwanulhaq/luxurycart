export class NewIotDto {
    no?: number;
    imei: string;
    phonePrefix: string;
    phone: string;
    battery: number;
    subAccount: string;  //number
    iotModel: string;  //id
    integrated: string;
    allowTCPCommands: string;
    notes: string; //optional
    customId: string;  //optional
    device_Id:number;

}
export class EditIotDto {
    id?: string;
    iot_Id:string;
    no?: number;
    imei: string;
    // phonePrefix: string;
    // phone: string;
    battery: number;
    subAccount: string;  //number
    iotModel: string;  //id
    // integrated: string;
    // allowTCPCommands: string;
    // notes: string; //optional
    // customId: string;  //optional
    device_Id:number;

}