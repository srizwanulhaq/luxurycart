import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { BoothResponse } from '../domain/Dto/Booth/BoothDto';
import { HttpClient } from '@angular/common/http';
import { BoothDropDownResult } from '../domain/Dao/Booths/BoothDropDowndao';

@Injectable({
  providedIn: 'root'
})
export class BoothService {

  constructor(private http: HttpClient) { }


  getAllBooth(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminBooth/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as BoothResponse)
  .then(data => data.data);
 }
 saveBooth(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminBooth/save`, model);
}
updateBooth(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminBooth/update`, model);
}

 loadMultipleSources() {
  return this.http.get(`${environment.apiUrl}/api/v1/AdminBooth/dropdowns/load`)
      .toPromise()
      .then(res => res as BoothDropDownResult)
      .then(data => data.data);
}
changeStatus(model:any)
{
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminBooth/active/deactive`,model);
}
}
