import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityResponse } from '../domain/Dao/Cities/CityListDao';
import { EditCityDto } from '../domain/Dto/Cities/EditCityDto';
import { NewCityDto } from '../domain/Dto/Cities/NewCityDto';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) { }

    getCity(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminCity/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}${dateRangeStr}`)
            .toPromise()
            .then(res => res as CityResponse)
            .then(data => data.data);
    }
    saveCity(city: NewCityDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCity/save`, city);
    }
    updateCity(city: EditCityDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCity/update`, city);
    }
}
