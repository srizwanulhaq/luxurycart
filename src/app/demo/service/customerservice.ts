import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';
import { CustomerPhoneResponse } from '../domain/Dao/Customer/CustomerPhonedao';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getPhones(query: any){
        return this.http.get<CustomerPhoneResponse>(`${environment.apiUrl}/api/v1/AdminUsers/GetPhones?query=${query}`)
        .toPromise()
        .then(res => res as CustomerPhoneResponse)
        .then(data => data.userphonedto);
    }

}
