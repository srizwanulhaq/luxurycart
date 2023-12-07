import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PendingCommmandResponse } from '../domain/Dao/PendingCommands/PendingCommandListDao';

@Injectable({
  providedIn: 'root'
})
export class PendingCommandService {

  constructor(private http: HttpClient) { }

  // getPendingCommand(pageIndex: number, pageSize: number,globalFilter:string,sortField:string,sortOrder:number,customerStatusValue:number) 
  // {
  // return this.http.get<PendingCommmandResponse>(`${environment.apiUrl}/api/v2/AdminVehicleCommand/All?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`);
  // }

  getPendingCommand(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number) {

    return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminVehicleCommand/list?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
        .toPromise()
        .then(res => res as PendingCommmandResponse)
        .then(data => data.data);
}
}
