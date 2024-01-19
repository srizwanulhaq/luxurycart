import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UserFormDao, UserFormDaoValues } from '../domain/Dao/User/UserFormDao';
import { UserListResponse } from '../domain/Dao/User/UserListDao';
import { AllUserTrackResp, UserTrackDetailResp } from '../domain/Dao/User/UserTrackingDao';
import { EditUserDto } from '../domain/Dto/Users/EditUserDto';
import { NewUserDto } from '../domain/Dto/Users/NewUserDto';


@Injectable({
    providedIn: 'root'
})
export class UserService {



    constructor(private _http: HttpClient) { }

    getAllUsers(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, dateRangeStr: string) {
        return this._http.get<UserListResponse>(`${environment.apiUrl}/api/v2/AdminUsers/list?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`)
            .toPromise()
            .then(res => res as UserListResponse)
            .then(data => data.data);
    }
    getAllChildUsers(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, dateRangeStr: string) {
        return this._http.get<UserListResponse>(`${environment.apiUrl}/api/v2/AdminUsers/childlist?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`)
            .toPromise()
            .then(res => res as UserListResponse)
            .then(data => data.data);
    }

    requestDataFromMultipleSources() {
        return this._http.get(`${environment.apiUrl}/api/v2/AdminUsers/dropdowns/load-values`)
            .toPromise()
            .then(res => res as UserFormDao)
            .then(data => data.data);
    }

    saveUser(user: NewUserDto) {
        console.log(user);
        return this._http.post<any>(`${environment.apiUrl}/api/v2/AdminUsers/save`, user);
    }

    updateUser(user: EditUserDto) {
        return this._http.post<any>(`${environment.apiUrl}/api/v2/AdminUsers/update`, user);
    }

    getAllUserTrackResp(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        selectedLogStatus: string,
        isWithinZone: string
        , dateRangeStr: string
    ) {
        globalFilter = !globalFilter ? "" : globalFilter
        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminUserTracking/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}
        &globalFilter=${globalFilter}&selectedLogStatus=${selectedLogStatus}&isWithinZone=${isWithinZone}${dateRangeStr}`)
            .toPromise()
            .then(res => res as AllUserTrackResp)
            .then(data => data.data);
    }

    getAllUserTrackingResp(searchValue: string,) {
        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminUserTracking/map?searchValue=${searchValue}`)
            .toPromise()
            .then(data => data.data);
    }

    getUserTrackDetailResp(
        userId: string,
        selectedLogStatus: string,
        dateRangeStr: string,
        isWithinZone: string,
        pageIndex: number = 1,
        pageSize: number = 10,
        globalFilter: string = "",
        sortField: string = "",
        sortOrder: number = -1
    ) {
        globalFilter = !globalFilter ? "" : globalFilter
        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminUserTracking/getdetails?userId=${userId}&pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}
        &globalFilter=${globalFilter}&selectedLogStatus=${selectedLogStatus}&isWithinZone=${isWithinZone}${dateRangeStr}`)
            .toPromise()
            .then(res => res as UserTrackDetailResp)
    }
    // getParentName(parentId) {
    //     return this._http.get<VehicleDetailsdaoResult>(`${environment.apiUrl}api/v2/AdminUsers/vehicaleDetails?parentId=${parentId}`);
    // }
}
