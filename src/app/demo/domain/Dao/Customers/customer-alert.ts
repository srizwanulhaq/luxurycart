export class Customers_Alert {
    fullName?: string;
    email: string;
    phoneNumber: string;
}
export class CustomersDtos {
    fullName?: string;
    email: string;
    phoneNumber: string;
}

export class Customersload {
    code: string;
    name: string;
}

export class SendCustomersAlertdao {
    id?: string;
    customers?: string[];
    eng_Message: string;
    arabic_Message: string;
}

export class CustomersAlertto {
    data: CustomersAlertdtos[];
    totalCount: number;
}

export class CustomerAlertResponse {
    status: boolean;
    message: string;
    individualCustomer: CustomersAlertto;
}

export class CustomersAlertdtos {
    id?: string;
    eng_Message: string;
    arabic_Message: string;
    active: boolean;
    created_at: Date;
}

export class CustomerCustomersAlertdtos {
    id?: string;
    customers_Alert_Id?: string;
    customer_Id: string;
    active: boolean;
    created_at: Date;
}

export class SendSingleAlert {
    id?: string;
    customers: Idsload[];
    eng_Message: string;
    arabic_Message: string;
}

export class Idsload {
    customer_Id: string;
}


