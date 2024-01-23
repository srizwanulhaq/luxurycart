import { PointSlotListDto } from "./PointSlotListDto";

export class PointSlotResponse {
    result: boolean;
    status: string;
    message: string;
    data: PointSlotListDto;
}
