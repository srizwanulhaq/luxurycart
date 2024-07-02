import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectEventService {

  constructor(private http: HttpClient) { }

  getAllProjectEvents(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string){
      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProjectEvent/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  }
  getAllProjectEventTickets(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string){
      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProjectCustomerTicket/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  }
  getProjectDD(){
    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProjectEvent/getProjectDD`)
  }
  createProjectEvent(data: any){
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProjectEvent/save`,data)
  }
  updateProjectEvent(data: any){
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProjectEvent/update`,data)
  }
}
