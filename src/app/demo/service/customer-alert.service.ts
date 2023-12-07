import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CustomerAlertResponse, SendCustomersAlertdao, SendSingleAlert } from '../domain/Dao/Customers/customer-alert';

@Injectable({
  providedIn: 'root'
})
export class CustomerAlertService {

  constructor(private _http: HttpClient) { }

  getAllCustomersAlertParams(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number) {
    return this._http.get<CustomerAlertResponse>(`${environment.apiUrl}/api/v1/AdminCustomersAlert/getAllCustomersAlertParams?
    pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`);
  }
  sendCustomersAlert(model: any) {
    return this._http.post<any>(`${environment.apiUrl}/api/v3/AdminCustomersAlert/sendCustomersAlert`, model);
  }

  // getDetails(id: string) {
  //   return this._http.get<CustomerCustomersAlertdtos[]>(`${environment.apiUrl}/api/v1/AdminCustomersAlert/getDetails?id=${id}`);
  // }

  sendAlertByCustomerId(alert_Id: string, customer_Id: string) {
    return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomersAlert/sendAlertByCustomerId`, null, { params: { alert_Id: alert_Id, customer_Id: customer_Id } });
  }

  sendCustomerAlertById(alert_Id: string) {
    return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomersAlert/sendCustomerAlertById`, null, { params: { alert_Id: alert_Id } });
  }

  getIndividualDetails(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number,id: string) {

    return this._http.get<CustomerAlertResponse>(`${environment.apiUrl}/api/v2/AdminCustomersAlert/getIndividualDetails?
    pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&id=${id}`);
  }
}
