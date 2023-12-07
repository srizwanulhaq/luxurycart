import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConciergePackageResponse } from '../domain/Dao/Concierge/concierge-packages';

@Injectable({
  providedIn: 'root'
})
export class ConciergePackageService {

  constructor(private http: HttpClient) { }

  getAllPackages(pageIndex: number, pageSize: number, globalFilter: string,
      sortField: string, sortOrder: number, dateRangeStr: string) {

      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminConciergePackage/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}${dateRangeStr}`)
          .toPromise()
          .then(res => res as ConciergePackageResponse)
          .then(data => data.data);
  }

  savePackage(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminConciergePackage/save`, model);
  } 
  updatePackage(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminConciergePackage/update`, model);
  }
  changeStatus(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminConciergePackage/active/deactive`,model);
  }
}
