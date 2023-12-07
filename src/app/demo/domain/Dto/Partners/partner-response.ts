import { PartnerListDto } from "./partner-list-dto";

export class PartnerResponse {
    result: boolean;
    status: string;
    message: string;
    data: PartnerListDto;
}
