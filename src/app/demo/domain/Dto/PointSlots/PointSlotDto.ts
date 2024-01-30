
export class PointSlotDto {
    id:string;
    total_seats:number;
    left_seats:number;
    points: TourPointDto;
    tour_slot:TourSlotDto;
    created_at:Date;
    active:boolean;

}
export class TourPointDto{

    name:string;
}
export class TourSlotDto{

    time_Slot:string;
}

