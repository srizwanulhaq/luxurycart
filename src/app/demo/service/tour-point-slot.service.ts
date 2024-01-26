import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PointSlotDropDownResult } from '../domain/Dao/TourPointSlots/PointSlotDropDowndao';
import { PointSlotResponse } from '../domain/Dto/PointSlots/PointSlotResponse';

@Injectable({
  providedIn: 'root'
})
export class TourPointSlotService {

  constructor(private http: HttpClient) { }

  savePointSlot(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminSlot/save`, model);
}
updatePointSlot(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminSlot/update`, model);
}
getAllPointSlots(pageIndex: number, pageSize: number, globalFilter: string,
  sortField: string, sortOrder: number) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminSlot/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
   .toPromise()
   .then(res => res as PointSlotResponse)
   .then(data => data.data);
}
  requestDataFromMultipleSources() {
    return this.http.get(`${environment.apiUrl}/api/v1/AdminSlot/dropdowns/load-values`)
        .toPromise()
        .then(res => res as PointSlotDropDownResult)
        .then(data => data.result);
}
  changeStatus(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminSlot/active/deactive`,model);
  }
}
