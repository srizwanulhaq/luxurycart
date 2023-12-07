import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DashboardRidesDataResponse } from '../domain/Dao/Dashboard/DashboardDataDao';
import { SimpleZoneDao } from '../domain/Dao/ParkingZone/ParkingZonedao';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) { }

    getRidesDashboardData(filter: number, zoneId: string, dateRangeStr: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/v4/AdminDashboard/getstats?dashboardFilter=${filter}&parkingZoneId=${zoneId}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            // .then(res => res.data as DashboardRidesDataResponse)
            // .then(data => data)
            .then(data => data as DashboardRidesDataResponse);
    }
    getGraphData(filter: number, zoneId: string, dateRangeStr: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/v4/AdminDashboard/getgraph?dashboardFilter=${filter}&parkingZoneId=${zoneId}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(data => data as DashboardRidesDataResponse);
    }
    getUserData(filter: number, zoneId: string, dateRangeStr: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/v4/AdminDashboard/userstats?dashboardFilter=${filter}&parkingZoneId=${zoneId}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(data => data as DashboardRidesDataResponse);
    }

    getAllZones() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminDashboard/zone-load`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            // .then(res => res.data as DashboardRidesDataResponse)
            // .then(data => data)
            .then(data => data.data.result as SimpleZoneDao[]);
    }

}
