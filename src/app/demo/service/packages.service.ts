import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PackageResponse } from '../domain/Dao/Tours/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient) { }

  getAllPackages(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminTourPackage/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as PackageResponse)
  .then(data => data.data);
 }
 savePackage(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTourPackage/save`, model);
}
updatePackage(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTourPackage/update`, model);
}

changeStatus(model:any)
{
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminTourPackage/active/deactive`,model);
}
}
