import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VehicleRentResponse, Vehicles_Rent_Status } from '../domain/Dao/VehicleRentRequest/vehicle-rent-requestDao';

@Injectable({
    providedIn: 'root'
})
export class VehicleRentRequestService {

    constructor(private http: HttpClient) { }


    getVehicleRentRequests(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        dateRangeStr: string
    ) {
        return this.http.get<VehicleRentResponse>(
            `${environment.apiUrl}/api/v1/AdminVehicles/VehicleRentRequests?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`
        );
    }

    getAllVehicleRentStatus() {
        return this.http.get<Vehicles_Rent_Status[]>(
            `${environment.apiUrl}/api/v1/AdminVehicles/getAllRentStatus`
        );
    }

    changeRentVehicleStatus(rentId: string, rentStatusNumber: number) {
        var model = {
            rentId: rentId,
            rentStatusNumber: rentStatusNumber,
        };
        return this.http.post<any>(
            `${environment.apiUrl}/api/v1/AdminVehicles/changeRentVehicleStatus`,
            model
        );
    }
}
