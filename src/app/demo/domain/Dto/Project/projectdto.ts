import { Parking_ZonesDto } from "../Zone/Parking_ZonesDto";

export class Projectdto {
    projectName:string;
    arabicName:string;
    lstZones:Parking_ZonesDto[];
    created_at:string;
    active:boolean;
}