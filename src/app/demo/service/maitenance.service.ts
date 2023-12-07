import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MaintenanceInventoryDetailsRoot, MaintenanceRoot } from '../domain/Dao/Maintenance/maintenance-dao';

@Injectable({
    providedIn: 'root'
})
export class MaitenanceService {

    constructor(private http: HttpClient) { }

    getAll(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, dateRangeStr: string) {
        return this.http.get<MaintenanceRoot>(`${environment.apiUrl}/api/v2/AdminMaintenance/get?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`);
    }
    getInventoryDetails(Id: string) {
        return this.http
            .get<MaintenanceInventoryDetailsRoot>(`${environment.apiUrl}/api/v1/AdminMaintenance/maintenance-inventory-id?maintenanceId=${Id}`);
    }
}
