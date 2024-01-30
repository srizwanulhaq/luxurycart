import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TourSlotResponse } from '../domain/Dao/tourSlots/TourSlotsListdao';
import { EditTourDto } from '../domain/Dto/TourSlots/EditTourDto';
import { PointSlotDropDownResult } from '../domain/Dao/TourPointSlots/PointSlotDropDowndao';

@Injectable({
    providedIn: 'root'
})
export class TourService {

    constructor(private _http: HttpClient) { }


    addTourSlots(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminTimeSlots/save`, model);
    }
    editTourSlots(slot: EditTourDto) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminTimeSlots/update`, slot);
    }

    getTourTimes(pageIndex: number, pageSize: number,  globalFilter: string,
        sortField: string, sortOrder: number, StatusValue: number) {

        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminTimeSlots/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${StatusValue}`)
            .toPromise()
            .then(res => res as TourSlotResponse)
            .then(data => data.data);
    }

    changeStatus(model:any)
        {
            return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminTimeSlots/active/deactive`,model);
    }
    requestDataFromMultipleSources() {
        return this._http.get(`${environment.apiUrl}/api/v1/AdminSlot/dropdowns/load-values`)
            .toPromise()
            .then(res => res as PointSlotDropDownResult)
            .then(data => data.result);
    }
}
