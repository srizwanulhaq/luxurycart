export class PointSlotDropDownResult
{
    message:string;
    result: PointSlotDropDownDao;
    status:boolean;
}

export class PointSlotDropDownDao{
    lstPoints: PointSlotsDropDown[];
    lstTimeSlots: PointSlotsDropDown[];
    lstTourPackages: PointSlotsDropDown[];
}
export class PointSlotsDropDown{
    label:string;
    value:string;
}

