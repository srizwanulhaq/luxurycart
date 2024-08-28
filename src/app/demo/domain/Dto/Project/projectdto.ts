import { Parking_ZonesDto } from "../Zone/Parking_ZonesDto";

export class Projectdto {
    projectName:string;
    arabicName:string;
    city_Id:string;
    vehicletypeId:[]
    created_at:string;
    active:boolean;
    status:string;
    start_Date:string;
    end_Date:string;
}
export class ProjectDropDown {
    label:string;
    value:string;
}