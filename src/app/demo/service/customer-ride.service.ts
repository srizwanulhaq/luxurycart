import { environment } from 'src/environments/environment';
import { VehicleResponse } from '../domain/Dao/Vehicle/VehicleListdao';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WalletPackageListResponse } from '../domain/Dao/WalletPackages/WalletPackageDao';
import { TransactionModesRoot } from '../domain/Dao/Customers/customer-bonus';
import { AddCustomerRide } from '../domain/Dto/CustomerRides/add-customer-ride';
@Injectable({
  providedIn: 'root'
})
export class CustomerRideService {

  constructor(private http: HttpClient) { }

  getVehicles() {

    return this.http.get<any>(`${environment.apiUrl}/api/v2/AdminCustomers/getVehicles`);
  }

  getTransactionModesLoad() {
    return this.http.get<TransactionModesRoot>(`${environment.apiUrl}/api/v2/AdminCustomers/get-transaction-modes`);
  }
  save(customer_ride: AddCustomerRide) {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminRides/customerRide`, customer_ride);
  }
}
