import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  getAllGame(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string){
      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminGame/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  }
  getAllGameTicket(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string){
      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminGameTicket/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  }
  createGame(data){
    return this.http.post(`${environment.apiUrl}/api/v1/AdminGame/save`,data)
  }
  updateGame(data){
    return this.http.post(`${environment.apiUrl}/api/v1/AdminGame/update`,data)
  }
}

