import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PartnerResponse } from '../domain/Dto/Partners/partner-response';
import { PartnerDropDownResult } from '../domain/Dao/Partmers/PartnerDropDowndao';
import { PartnerRevenueResponse } from '../domain/Dto/Partner Revenue/partner-response';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }


  savePartner(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPartners/save`, model);
}

  getAllPartners(pageIndex: number, pageSize: number, globalFilter: string,
     sortField: string, sortOrder: number) {

      return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminPartners/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .toPromise()
      .then(res => res as PartnerResponse)
      .then(data => data.data);
 }

loadDropdown() {
  return this.http.get(`${environment.apiUrl}/api/v1/AdminPartners/dropdowns/Partner`)
      .toPromise()
      .then(res => res as PartnerDropDownResult)
      .then(data => data.result);
}

getPartnerRevenue(partner_Id: string, parking_Id: string ,selectedPeriod:number, selectedYear:number ,start_Date:string,end_Date:string) {
   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminPartners/partnerRevenue?partner_Id=${partner_Id}&parking_Id=${parking_Id}&selectedPeriod=${selectedPeriod}&selectedYear=${selectedYear}&start_Date=${start_Date}&end_Date=${end_Date}`)

}
}
