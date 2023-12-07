import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivityloggingCountDao, ActivityloggingCountResonseDao } from "../domain/Dao/ActivityLogging/ActivityLogginCountDao";
import { AllNotificationsRespDao, NotificationDao } from "../domain/Dao/Notification/NotificationDao";

@Injectable()

export class NotificationService {
    
    
    constructor(private http: HttpClient) { }

    getNotificationCount() {
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminActivityLogging/count`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(data => data as ActivityloggingCountResonseDao)
    }

    getUnreadNotification() {
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminActivityLogging/activityresult`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as NotificationDao[])
    }

    getAllNotifications(pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number) {
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminActivityLogging/gethierarchicallogs?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as AllNotificationsRespDao)
    }

    readNotifications() {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminActivityLogging/updatelastnotificationseen`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as { status: Boolean, message: String })
    }

}
