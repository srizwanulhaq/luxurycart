
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogsDao } from '../domain/Dto/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {


  constructor(private http: HttpClient) { }

    GetLogsList(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number,      selectedStatus: number,dateRangeStr: string, 
   
        ) {
       
        return this.http.get<any>(`${environment.apiUrl}/api/v1/Log/get?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&StatusValue=${selectedStatus}${dateRangeStr}`)
            .toPromise()
            .then(res => res as LogsDao)
            .then(data => data.data);
    }
    // saveCurrency(currency: NewCurrencyDto) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCurrency/save`, currency);
    // }
    // loadDropDown() {
    //     return this.http
    //         .get<DropDownResult>(`${environment.apiUrl}/api/v1/AdminCurrency/dropdowns/load-values`);
    // }
    // updateCurrency(currency: EditCurrencyDto) {
    //     return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCurrency/update`, currency);
    // }
}
