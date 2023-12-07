import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityDropDownResult } from '../domain/Dao/Promotions/CityDropDowndao';
import { AllDropDownResult } from '../domain/Dao/Zone/AllDropDowndao';
import { AllDropDowndao2 } from '../domain/Dao/Zone/AllDropDowndao2';
import { EditZoneDao } from '../domain/Dao/Zone/EditZoneDao';
import { NewZoneDao } from '../domain/Dao/Zone/NewZoneDao';
import { ParkingZonesResponse, Parking_ZonesDto } from '../domain/Dto/Zone/Parking_ZonesDto';
import { NewVisitPlaceDao } from '../domain/Dao/VisitPlaces/NewVisitPlaceDao';
import { VisitPlaceResponse } from '../domain/Dto/VisitPlaces/VisitPlaceDto';

@Injectable({
    providedIn: 'root'
})
export class VisitPlaceService {

    constructor(private http: HttpClient) { }

    savePlace(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVisitPlaces/save`, formData);
    }
    updatePlace(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVisitPlaces/edit`, formData);
    }

    getAllVisitPlace(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number) {

    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminVisitPlaces/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .toPromise()
      .then(res => res as VisitPlaceResponse)
      .then(data => data.data);
       }
    changeStatus(model:any){
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVisitPlaces/toggle`,model);
    } 

}
