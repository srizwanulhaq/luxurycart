import { Injectable } from '@angular/core';
import { EventTicketTypeResponse } from '../domain/Dao/Event-Ticket-Type/event-ticket-type-dao';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTicketTypeService {

  constructor(private http: HttpClient) { }
  getAll(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProjectTicketType/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as EventTicketTypeResponse)
  .then(data => data.data);
 }
 save(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProjectTicketType/save`, model);
}
update(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProjectTicketType/update`, model);
}

changeStatus(model:any)
{
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProjectTicketType/active/deactive`,model);
}
}
