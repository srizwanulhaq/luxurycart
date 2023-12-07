import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RideScrutinyTemplateListResponse } from "../domain/Dao/RideScrutinyTemplate/ScrutinyTemplateDao";
import { RideScrutinyTemplateDto } from "../domain/Dto/RideScrutinyTemplate/ScrutinyTemplateDto";

@Injectable()

export class RideScrutinyTemplateService {
    constructor(private http: HttpClient) { }

    getRideScrutinyTemplates(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        dateRangeStr: string
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v1/admin/ride-scrutiny-templates?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as RideScrutinyTemplateListResponse);
    }

    toggleRideScrutinyTemplate(id: number) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/admin/ride-scrutiny-templates/${id}/toggle`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }

    submitRideScrutinyTemplate(template: RideScrutinyTemplateDto, id: number | string) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/admin/ride-scrutiny-templates/${id}`, template, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise()
    }
}
