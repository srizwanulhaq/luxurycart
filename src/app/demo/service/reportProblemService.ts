import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportProblemListResponse } from "../domain/Dao/ReportProblems/ReportProblemDao";

@Injectable()

export class ReportProblemService {
    constructor(private http: HttpClient) { }

    getReportProblems(
        pageIndex: number,
        pageSize: number,
        globalFilter: string,
        sortField: string,
        sortOrder: number,
        dateRangeStr: string
    ) {
        sortField = sortField == undefined ? '' : sortField
        globalFilter = globalFilter == null ? '' : globalFilter
        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminReportProblems/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .then(res => res as ReportProblemListResponse)
            .then(data => data);
    }
}
