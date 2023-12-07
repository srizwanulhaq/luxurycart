import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConciergeRequestResponse } from '../domain/Dao/Concierge/concierge-request';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConciergeRequestService {

  constructor(private http: HttpClient) { }

    getAllRequests(pageIndex: number, pageSize: number, globalFilter: string,
        sortField: string, sortOrder: number,StatusValue:number, dateRangeStr: string) {

        return this.http.get<any>(`${environment.apiUrl}/api/v1/ConciergeRequest/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${StatusValue}${dateRangeStr}`)
            .toPromise()
            .then(res => res as ConciergeRequestResponse)
            .then(data => data.data);
    }
    getStatus(): Observable<any[]> {
      let statuses = this.http.get(`${environment.apiUrl}/api/v1/ConciergeRequest/getAllRequestStatus`);

      return forkJoin([statuses]);
  }
}
