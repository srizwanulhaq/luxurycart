import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TourCustomerPurchaseResponse } from '../domain/Dao/Tours/tour-customer-purchase';

@Injectable({
  providedIn: 'root'
})
export class TourCustomerPurchaseService {

  constructor(private http:HttpClient) { }
  getAllPurchases(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminCustomerTourPackage/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as TourCustomerPurchaseResponse)
  .then(data => data.data);
 }
  
}
