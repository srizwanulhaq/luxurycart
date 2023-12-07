import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportResp } from "../domain/Dao/StatsReport/StatsReportDao";

@Injectable()

export class StatsReportService {
    constructor(private http: HttpClient) { }

    getReports(
        type: string,
        reportType: "simple" | "quarterly",
        range?: { startDate: string, endDate: string } | { month?: number, year: number } | ""
    ) {
        const params = !!range ? Object.entries(range).map(([k, v]) => `${k}=${v}`).join("&") : ""
        type = type.toLowerCase()
        const typeUrls = `get${reportType == "simple" ? "" : reportType}${type}s`

        return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminStats/${typeUrls}?${params}`)
            .toPromise()
            .then(res => res as ReportResp)
    }

    generateReport(month: number, year: number) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminStats/generate/zone/report?month=${month}&year=${year}`, null)
            .toPromise();
    }
}
