import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminCustomerListDAOResponse, CustomerStatus } from '../domain/Dao/Customers/customer';
import { TourSlotResponse } from '../domain/Dao/Vehicle/TourSlotsListdao';

@Injectable({
    providedIn: 'root'
})
export class TourService {

    constructor(private _http: HttpClient) { }


    getToursParams(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, customerStatusValue: number, dateRangeStr: string) {
        return this._http.get<AdminCustomerListDAOResponse>(`${environment.apiUrl}/api/v2/AdminCustomers/All?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&customerStatusValue=${customerStatusValue}${dateRangeStr}`);
    }

    getTourTimes(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number, vehicleStatusValue: number, dateRangeStr: string) {

        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminTimeSlots/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${vehicleStatusValue}${dateRangeStr}`)
            .toPromise()
            .then(res => res as TourSlotResponse)
            .then(data => data.data);
    }
}
