import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { MapsResponse } from '../domain/Dao/Maps/map-dao';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private _http: HttpClient) { }

  getAllMaps() {
    return this._http
      .get<MapsResponse>(`${environment.apiUrl}/api/v2/AdminMaps/getAllMaps`);
  }
  getVehicleStatus(vNumber:any) {
    return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminVehicles/getStatus?vehicleNumber=${vNumber}`);
}
    getZoneStats(filter: number, zoneId: string, dateRangeStr: string) {
    return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminMaps/getZoneStats?dashboardFilter=${filter}&parkingZoneId=${zoneId}${dateRangeStr}`);
}
}
