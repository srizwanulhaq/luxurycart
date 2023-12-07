export class CustomerPhonedao {
    name:string;
    code: string;
}

export class CustomerPhoneResponse {
    status: boolean;
    message: string;
    userphonedto: CustomerPhonedao[];
}
