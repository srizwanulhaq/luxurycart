import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrencyResponse } from '../domain/Dao/Currencies/CurrencyListDao';
import { DropDownResult } from '../domain/Dao/Currencies/DropDowndao';
import { EditCurrencyDto } from '../domain/Dto/Currencies/EditCurrencyDto';
import { NewCurrencyDto } from '../domain/Dto/Currencies/NewCurrencyDto';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    constructor(private http: HttpClient) { }

    getCurrency(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminCurrency/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}${dateRangeStr}`)
            .toPromise()
            .then(res => res as CurrencyResponse)
            .then(data => data.data);
    }
    saveCurrency(currency: NewCurrencyDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCurrency/save`, currency);
    }
    loadDropDown() {
        return this.http
            .get<DropDownResult>(`${environment.apiUrl}/api/v1/AdminCurrency/dropdowns/load-values`);
    }
    updateCurrency(currency: EditCurrencyDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminCurrency/update`, currency);
    }
}
