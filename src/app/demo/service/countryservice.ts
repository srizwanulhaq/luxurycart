import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryResponse } from '../domain/Dao/Countries/CountryListDao';
import { EditCountryDto } from '../domain/Dto/Countries/EditCountryDto';
import { NewCountryDto } from '../domain/Dto/Countries/NewCountryDto';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get<any>('assets/demo/data/countries.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    getCountry(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminCountry/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}${dateRangeStr}`)
            .toPromise()
            .then(res => res as CountryResponse)
            .then(data => data.data);
    }
    saveCountry(country: NewCountryDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCountry/save`, country);
    }
    updateCountry(country: EditCountryDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCountry/save`, country);
    }
}
