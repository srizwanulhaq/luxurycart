export class NewPromoCode {
    id:string;
    code:string;
    quantity:number;
    per_Usage:number;
    credits:number;
    start_Date:Date;
    end_Date:number;
    is_New_User:boolean;
    title:string;
    package_Id:string;
    parking_Zone_Id:string;
}
export class getpackages{
    id:string;
    title:string;
}
export class getparkingzones{
    id:string;
    title:string;
    number:number;
}
