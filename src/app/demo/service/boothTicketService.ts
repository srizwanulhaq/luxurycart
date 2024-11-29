import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BoothResponseV2 } from '../domain/Dao/BoothTicket/BoothTicketdao';

@Injectable({
  providedIn: 'root'
})
export class BoothTicketService {

  constructor(private _http: HttpClient) { }

  // Function to fetch all booth ticket records from the API
  getAllBoothsRecords(
    pageIndex: number, 
    pageSize: number, 
    globalFilter: string, 
    sortField: string, 
    sortOrder: number, 
    selectedStatus: number, 
    dateRangeStr: string
  ) {
    // Constructing the API endpoint with query parameters
    const url = `${environment.apiUrl}/api/v2/AdminTransaction/AllBoothsRecords?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&selectedStatus=${selectedStatus}&globalFilter=${globalFilter}${dateRangeStr}`;
    
    return this._http.get<any>(url)
      .toPromise() // Use Promises for asynchronous calls if needed
      .then(res => res as BoothResponseV2) // Casting response to BoothResponseV2
      .then(data => data.data); // Returning the actual data (assuming 'data' is the desired array)
  }
}
