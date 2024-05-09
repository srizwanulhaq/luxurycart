import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LCTourPackageResponse, TicketDropDown } from '../domain/Dao/LCTourPackage/lc-tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class LCTourPackageService {

  constructor(private http: HttpClient) { }

  getAllPackages(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminLCTourPackages/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
    .toPromise()
    .then(res => res as LCTourPackageResponse)
    .then(data => data.data);
  }
  savePackage(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminLCTourPackages/save`, model);
  }
  updatePackage(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminLCTourPackages/update`, model);
  }

  changeStatus(model:any)
  {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminLCTourPackages/active/deactive`,model);
  }
  getTicketTypeDropdowns() {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminLCTourPackages/loadDropDown`, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    }).toPromise().then(data => data.data as TicketDropDown[]);
  }
}
