import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketTypeResponse } from '../domain/Dao/TicketType/ticket-type.model';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {

  constructor(private http: HttpClient) { }


  getAllTicketType(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminTicketType/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
    .toPromise()
    .then(res => res as TicketTypeResponse)
    .then(data => data.data);
  }
  saveTicketType(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTicketType/save`, model);
  }
  updateTicketType(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTicketType/update`, model);
  }

  changeStatus(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTicketType/active/deactive`,model);
  }
}
