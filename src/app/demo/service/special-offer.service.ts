import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParkingZoneDropDownResult } from '../domain/Dao/SpecialOffer/OfferParkingZoneDao';

import { SpecialOfferResponse } from '../domain/Dao/SpecialOffer/SpecialOfferListDao';
import { AddSpecialOfferDto } from '../domain/Dto/SpecialOffer/AddSpecialOfferDto';
import { EditSpecialOfferDto } from '../domain/Dto/SpecialOffer/EditSpecialOfferDto';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService {

  constructor(private http: HttpClient) { }

    getSpecialOffers(pageIndex: number,  pageSize: number, globalFilter: string, 
    sortField: string, sortOrder: number) {
        
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminSpecialOffer/All?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
        .toPromise()
        .then(res => res as SpecialOfferResponse)
        .then(data => data.data);
   }

    saveOffer(offer: AddSpecialOfferDto) {
    return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminSpecialOffer/save`,offer);
    }

    updateOffer(offer: EditSpecialOfferDto) {
    return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminSpecialOffer/update`,offer);
    }

    deleteoffer(offerId:string) {
    return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminSpecialOffer/delete`
    ,null,
      { params: { id: offerId } }
      );
    }

    parkingZones() {
      return this.http.get(`${environment.apiUrl}/api/v2/AdminSpecialOffer/dropdowns/parking_Zones`)
      .toPromise()
      .then(res => res as ParkingZoneDropDownResult)
      .then(data => data.result);
  }
}
