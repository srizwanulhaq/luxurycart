import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleDetailsdaoResult } from '../domain/Dao/Vehicle/VehicleDetailsDao';
import { VehicleDropDownResult } from '../domain/Dao/Vehicle/VehicleDropDowndao';
import { VehicleFilterResponse } from '../domain/Dao/Vehicle/VehicleFilterdao';
import { VehicleResponse } from '../domain/Dao/Vehicle/VehicleListdao';
import { VehicleParkingZonesRoot } from '../domain/Dao/Vehicle/VehiclesParkingZones';
import { VehicleStatusDropDownResult } from '../domain/Dao/Vehicle/VehicleStatusdao';
import { VehicleTrackingResponse } from '../domain/Dao/Vehicle/VehicleTrackingDao';
import { EditVehicleDto } from '../domain/Dto/Vehicles/EditVehicleDto';
import { NewVehicleDto } from '../domain/Dto/Vehicles/NewVehicleDto';
import { VehicleLocationDto } from '../domain/Dto/Vehicles/VehicleLocationDto';
import { BatteryHitListResponse } from '../domain/Dao/BatteryHit/BatteryHitDao';
import { VehicleCompanyListResponse } from '../domain/Dao/Vehicle/VehicleCompanydao';
import { VehicleCompanyDto, VehicleTypeDto } from '../domain/Dto/Vehicles/VehicleDto';
import { VehicleTypeListResponse } from '../domain/Dao/Vehicle/VehicleTypedao';
import { VehicleHeadCountResponse } from '../domain/Dao/Vehicle/VehicleHeadCountDao';
import { vehicleHeadCountDto } from '../domain/Dto/Vehicles/vehicleHeadCountDto';

@Injectable()
export class VehicleService {



    constructor(private http: HttpClient) { }

    searchScooters(query: any) {
        return this.http.get<VehicleFilterResponse>(`${environment.apiUrl}/api/v1/AdminVehicles/GetActiveVehicles?query=${query}`)
            .toPromise()
            .then(res => res as VehicleFilterResponse)
            .then(data => data.lstVhclDto);
    }

    getScooters(pageIndex: number, pageSize: number, globalFilter: string,selectedProject:string,
        sortField: string, sortOrder: number, vehicleStatusValue: number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminVehicles/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&selectedProject=${selectedProject}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${vehicleStatusValue}${dateRangeStr}`)
            .toPromise()
            .then(res => res as VehicleResponse)
            .then(data => data.data);
    }

    getAllVehicleHeadCounts(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number) {
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminVehicles/head/counts?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
            .toPromise()
            .then(res => res as VehicleHeadCountResponse)
            .then(data => data.data);
    }

    requestDataFromMultipleSources() {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminVehicles/dropdowns/load-values`)
            .toPromise()
            .then(res => res as VehicleDropDownResult)
            .then(data => data.result);
    }

    getStatus(): Observable<any[]> {
        let statuses = this.http.get(`${environment.apiUrl}/api/v1/AdminVehicles/getAllVehicleStatus`);

        return forkJoin([statuses]);
    }

    saveVehicle(vehicle: NewVehicleDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminVehicles/save`, vehicle);
    }

    setVehicleHeadCount(data: vehicleHeadCountDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminVehicles/head/counts`, data);
    }

    updateVehicle(vehicle: EditVehicleDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminVehicles/update`, vehicle);
    }

    updateLocation(model: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/update-location`, model);
    }

    VehicleStatus() {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminVehicles/dropdowns/Vehicale_Status`)
            .toPromise()
            .then(res => res as VehicleStatusDropDownResult)
            .then(data => data.result);
    }

    changeVehicleStatus(model: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/changeVehicleStatus`, model);
    }

    deleteVehicle(vehicleId: string) {
        return this.http.post<any>(
            `${environment.apiUrl}/api/v2/AdminVehicles/deleteVehicle`,
            null,
            { params: { id: vehicleId } }
        );
    }

    getVehicleDetails(vehicle_Id) {
        return this.http.get<VehicleDetailsdaoResult>(`${environment.apiUrl}/api/v2/AdminVehicles/vehicaleDetails?vehicle_Id=${vehicle_Id}`);
    }
    getParkingZones() {
        return this.http.get<VehicleParkingZonesRoot>(
            `${environment.apiUrl}/api/v1/AdminVehicles/get-parking_zones`
        );
    }
    updatezones(model: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/update-zones`, model);
    }

    saveVehicleLocation(model: VehicleLocationDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/save-vehicle-location`, model);
    }
    getVehicleTracking(selectedInterval: number, vehicle_number: string) {
        return this.http.get<VehicleTrackingResponse>(`${environment.apiUrl}/api/v1/AdminVehicles/VehicleTracking?vehicleNumber=${vehicle_number}&trackingStatusInterval=${selectedInterval}`
        );
    }

    sendAction(data: object, action: "command" | "status") {
        let part = action == "command" ? "AdminVehicleCommand/send" : "AdminVehicles/changeVehicleStatus"
        return this.http.post<any>(`${environment.apiUrl}/api/v2/${part}`, data);
    }
    getPendingCommands(vehicle_number) {
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminVehicleCommand/pendingCommands?vnumber=${vehicle_number}`);
    }
    getAllBatteryHits(
        vehicleNumber: string,
        globalFilter: string,
        pageIndex: number = 1,
        pageSize: number = 10,
        sortField: string = "",
        sortOrder: number = -1
    ) {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminVehicleCommand/GetBatteryCommandStats?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&vehicleNumber=${vehicleNumber}`)
            .toPromise()
            .then(res => res as BatteryHitListResponse)
            .then(res => res.data)
    }

    // Vehicle Company
    getVehicleCompanies(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        dateRangeStr: string
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v2/admin/vehicles/companies/list?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as VehicleCompanyListResponse);
    }

    toggleVehicleCompany(id: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/admin/vehicles/companies/${id}/toggle`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }

    submitVehicleCompany(data: VehicleCompanyDto, id: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/admin/vehicles/companies/${id}`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }

    // Vehicle Types
    getVehicleTypes(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        dateRangeStr: string
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v1/admin/vehicles/types/list?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as VehicleTypeListResponse);
    }

    toggleVehicleType(id: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/admin/vehicles/types/${id}/toggle`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }

    submitVehicleType(data: VehicleTypeDto, id: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/admin/vehicles/types/${id}`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }

    updateParkingZone(model:any)
    {
      return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/active/deactive`,model);
    }

    updatebattery(model:any)
    {
      return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminVehicles/batteryUpdate`,model);
    }
}


export type no = { commandNumber: string } | { statusNumeber: string }
