import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { ActivityLoggingResponse } from "../domain/Dao/ActivityLoggings/ActivityLoggingDao";

@Injectable()

export class ActivityLoggingService {
    constructor(private http: HttpClient) { }

    getActivityLoggings(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminActivityLogging/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as ActivityLoggingResponse)
            .then(data => data);
    }

    markAsRead(activityid = "") {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminActivityLogging/${!!activityid ? `MarkAsRead?id=${activityid}` : 'MarkAllAsRead'}`, {});
    }
}
