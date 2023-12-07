import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerInsuranceResponse } from '../domain/Dao/CustomerInsurance/customer-insurance';
@Injectable({
  providedIn: 'root'
})
export class CustomerInsuranceService {

  constructor(private http: HttpClient) { }

  getCustomerInsurance(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number,StatusValue:number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminCustomerInsurance/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${StatusValue}${dateRangeStr}`)
            .toPromise()
            .then(res => res as CustomerInsuranceResponse)
            .then(data => data.data);
        }
  
  Refund(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomerInsurance/refundAmount`, model);
  }
  GetStatus(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomerInsurance/refundStatus`, model);
  }
}
