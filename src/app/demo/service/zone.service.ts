import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CityDropDownResult } from '../domain/Dao/Promotions/CityDropDowndao';
import { AllDropDownResult } from '../domain/Dao/Zone/AllDropDowndao';
import { AllDropDowndao2 } from '../domain/Dao/Zone/AllDropDowndao2';
import { EditZoneDao } from '../domain/Dao/Zone/EditZoneDao';
import { NewZoneDao, Zone_PriceDao } from '../domain/Dao/Zone/NewZoneDao';
import { ParkingZonesResponse, Parking_ZonesDto } from '../domain/Dto/Zone/Parking_ZonesDto';
import { SimpleProjectDao } from '../domain/Dao/Projects/projects';
import { DriveModeDropDownResponse, VehicleTypeDropDown } from '../domain/Dao/Vehicle/VehicleTypedao';
import { ProjectDropDown } from '../domain/Dto/Project/projectdto';

@Injectable({
    providedIn: 'root'
})
export class ZoneService {

    constructor(private http: HttpClient) { }
    loadDropDown()
    {
      return this.http.get<DriveModeDropDownResponse>(`${environment.apiUrl}/api/v1/admin/vehicles/types/dropdowns/load-values`);
    }
    allDropDownResult() {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminParkingZone/dropdowns/load-values`)
            .toPromise()
            .then(res => res as AllDropDownResult)
            .then(data => data.result);
    }
    saveZone(zone: NewZoneDao) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/save`, zone);
    }
    saveZonePrice(zone: Zone_PriceDao) {
      return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/savePrice`, zone);
  }
  UpdateZonePrice(zone: Zone_PriceDao) {
    return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/UpdatePrice`, zone);
}
    getProjectDropdowns() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProject/project-dropdown`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise().then(data => data.data.result as ProjectDropDown[]);
      }
      getVehicleTypeDropdown() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/admin/vehicles/types/vehicle-dropdown`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        });
      }
      getVehicleTypeDropdownbyId(id:string) {
        console.log(id)
        return this.http.get<any>(`${environment.apiUrl}/api/v1/admin/vehicles/types/vehicle-dropdown-by-id?id=${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        });
      }
    updateZone(zone: EditZoneDao) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/update`, zone);
    }
    //  getAllZonesMap() {
    //   return this.http.get<Parking_ZonesDto[]>(`${environment.apiUrl}/api/v2/AdminParkingZone/get`);
    // }

    getAllZonesMap(pageIndex: number, pageSize: number, globalFilter: string, selectedProject:string,
        sortField: string, sortOrder: number, StatusValue: number, dateRangeStr: string) {

  return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&selectedProject=${selectedProject}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${StatusValue}${dateRangeStr}`)
      .toPromise()
      .then(res => res as ParkingZonesResponse)
      .then(data => data.data);
}
getAllZonePrice(pageIndex: number, pageSize: number, globalFilter: string, selectedProject:string,
  sortField: string, sortOrder: number, StatusValue: number, dateRangeStr: string) {

return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/getZonePrice?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&selectedProject=${selectedProject}&sortField=${sortField}&sortOrder=${sortOrder}&StatusValue=${StatusValue}${dateRangeStr}`)
.toPromise()
.then(res => res as ParkingZonesResponse)
.then(data => data.data);
}
loadCityDropDown() {
  return this.http
  .get<AllDropDowndao2>(`${environment.apiUrl}/api/v2/AdminParkingZone/cities/dropdown`);
 }
 changeZoneStatus(model:any)
 {
   return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/active/deactive`,model);
 } 
 changeScrutinyStatus(model:any)
 {
   return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminParkingZone/scrutinyToggle`,model);
 }
}
