import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IotDAO, IotDtoes, IotListDAOResponse } from '../domain/Dao/IOT/IOTdao';
import { IOTDropDownDaoResult } from '../domain/Dao/IOT/iotdrop-down-dao';
import { EditIotDto } from '../domain/Dto/IOT/new-iot-dto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManageIotService {

    constructor(private _http: HttpClient) { }

    getAllManageIotParams(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, iotStatusValue: number, dateRangeStr: string) {
        return this._http.get<IotListDAOResponse>(`${environment.apiUrl}/api/v2/AdminIOT/All?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${iotStatusValue}${dateRangeStr}`);
    }
    rebootManageIot(iotId: string) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminManageIOT/rebootManageIot`, null, { params: { id: iotId } });
    }
    deleteManageIot(iotId: string) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminManageIOT/deleteManageIot`, null, { params: { id: iotId } });
    }

    saveManageIotData(iotDtoes: IotDtoes) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminManageIOT/saveManageIotData`, iotDtoes);
    }

    updateManageIotData(iotDtoes: EditIotDto) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminManageIOT/updateManageIotData`, iotDtoes);
    }
    unassign(iotId: string) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminManageIOT/unassign`, null, { params: { id: iotId } });
    }
    getAllSubAccountIOTModelLoad() {
        return this._http
            .get<IotDAO>(`${environment.apiUrl}/api/v1/AdminManageIOT/getAllSubAccountIOTModelLoad`);
    }

    requestDataFromMultipleSources() {
        return this._http.get(`${environment.apiUrl}/api/v2/AdminIOT/dropdowns/load-values`)
            .toPromise()
            .then(res => res as IOTDropDownDaoResult)
            .then(data => data.result);
    }
}
