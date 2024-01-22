import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PointResponse } from '../domain/Dao/Tours/points';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) { }

  getAllPoints(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminPoint/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as PointResponse)
  .then(data => data.data);
 }
 savePoint(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPoint/save`, model);
}
updatePoint(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPoint/update`, model);
}

changeStatus(model:any)
{
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPoint/active/deactive`,model);
}
}
