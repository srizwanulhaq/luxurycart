import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getCustomersResp, LoadCountriesResp } from "../domain/Dao/PushNotification/PushNotificationDao";
import { PushNotificationDto } from "../domain/Dto/PushNotification/PushNotificationDto";

@Injectable()

export class PushNotificationService {
    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminPushNotification/loaddata`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as LoadCountriesResp)
    }

    getCustomers(qry: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminUsers/GetPhones?query=${qry}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as getCustomersResp)
    }

    sendPushNotifications(body: PushNotificationDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPushNotification/send`, body);
    }
}
