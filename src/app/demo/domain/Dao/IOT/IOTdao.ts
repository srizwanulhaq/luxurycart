import { SubAccounts } from "../SubAccount/sub-accounts";
import { VehicleLocationHistory } from "../Vehicle/vehicle-location-history";
import { Vehicles } from "../Vehicle/Vehicles";

export class IOTdao{
    id?: string;
    imei: string;
    phonePrefix: string;
}

export class IOT {

    id?: string;
    imei: string;
    phonePrefix: string;
    phone: string;
    battery: number;
    sub_Accounts_Id: string;
    integrated: string;
    allowTCPCommands: string;
    notes: string; //Optional
    customId: string; //Optional
    active: boolean;
    created_at: Date;
    updated_at: Date;
    noofdays: number; //not mapped
    lastDate: string; //not mapped
}

export class IOTModels {
    id?: string;
    title: string;
    code: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}


export class IotDAO {
    lstSub_Accounts: SubAccounts[];
    lstIOTModels: IOTModels[];
}

export class IotDtoes {
    iot_Id?: string;
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
}

export class IotListDAO {
    id?: string;
    imei: string;
    phonePrefix: string;
    phone: string;
    battery: number;
    integrated: string;
    allowTCPCommands: string;
    notes: string; //Optional
    customId: string; //Optional
    sub_Accounts_Id:string;
    device_Id: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    //----------------------
    iotModels: IOTModels;
    vehicles: Vehicles;
    vehicle_Location_History: VehicleLocationHistory;
    ioT_Location: IOT_Location;


}
export class manageiotdao {
    data: IotListDAO[];
    totalCount: number;
}


export class IotListDAOResponse {
    result: boolean;
    status: string;
    message: string;
    manageiot: IotList;
}

export class IotList {
    results: IotListDAO[];
    currentPage:number;
    pageCount:number;
    pageSize:number;
    rowCount:number;
    isLast:boolean;
    firstRowOnPage:number;
    lastRowOnPage:number;
}
export class IOT_Location {

    id?:string; 
    iot_Id:number;
    latitude:number; 
    longitude:number; 
    active:boolean;
    created_at:Date;
    updated_at:Date;
}