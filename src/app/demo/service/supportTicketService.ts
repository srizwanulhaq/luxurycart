import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { SupportTicketListResponse, UserDetailsdaoResult } from "../domain/Dao/SupportTickets/SupportTicketDao";
import { SupportMaintenanceInventoryListResponse } from "../domain/Dao/SupportTickets/SupportMaintenanceInventoryDao";
import { NewVehiclemaintenanceDto } from "../domain/Dto/SupportTickets/VehiclemaintenanceDto";
import { SupportTicketStatusDao } from "../domain/Dao/SupportTickets/SupportTicketStatusDao";

@Injectable()

export class SupportTicketService {
    constructor(private http: HttpClient) { }

    getSupportTickets(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        status: number
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<SupportTicketListResponse>(`${environment.apiUrl}/api/v2/AdminSupportTicket/get-support-tickets?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&StatusValue=${status}`)
            .toPromise()
            .then(res => res as SupportTicketListResponse)
            .then(data => data);
    }

    storeVehicleMaintenance(data: NewVehiclemaintenanceDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminSupportTicket/save-maintenance`, data);
    }

    getInventories() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminSupportTicket/inventory`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as SupportMaintenanceInventoryListResponse)
            .then(data => data);
    }

    getSupportTicketStatuses() {
        return this.http.get<SupportTicketStatusDao[]>(`${environment.apiUrl}/api/v2/AdminSupportTicket/status/get`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(data => data);
    }
    getUserDetails(user_Id) {
        return this.http.get<UserDetailsdaoResult>(`${environment.apiUrl}/api/v2/AdminSupportTicket/userDetails?user_Id=${user_Id}`);
    }
}
