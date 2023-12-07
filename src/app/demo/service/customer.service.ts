import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminCustomerListDAOResponse, CustomerStatus } from '../domain/Dao/Customers/customer';
import { TransactionModesRoot } from '../domain/Dao/Customers/customer-bonus';
import { RidesResponse } from '../domain/Dao/Rides/Ridedao';
import { CustomerDetailsDtoResult } from '../domain/Dto/Customers/customer-details-dto';
import { EditCustomerdto } from '../domain/Dto/Customers/EditCustomerdto';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private _http: HttpClient) { }


    getAllCustomersParams(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, customerStatusValue: number, dateRangeStr: string) {
        return this._http.get<AdminCustomerListDAOResponse>(`${environment.apiUrl}/api/v2/AdminCustomers/All?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&customerStatusValue=${customerStatusValue}${dateRangeStr}`);
    }
    getAllCustomerStatus() {
        return this._http.get<CustomerStatus[]>(`${environment.apiUrl}/api/v1/AdminCustomers/getAllCustomerStatus`);
    }
    getCustomerRecordByDateRange(pageIndex: number, pageSize: number, startDate: string, endDate: string) {
        return this._http.get<AdminCustomerListDAOResponse>(`${environment.apiUrl}/api/v1/AdminCustomers/getCustomerRecordByDateRange?pageSize=${pageSize}&PageNumber=${pageIndex}&startDate=${startDate}&endDate=${endDate}`);
    }
    addCustomerReg(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomers/customerReg`, model);
    }
    updateCustomer(model: EditCustomerdto) {
        return this._http.post<any>(`${environment.apiUrl}/api/v2/AdminCustomers/update`, model);
    }
    ChangeGroupEligibility(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomers/changeGroupEligibility`, model);
    }
    addCustomerWallet(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v2/AdminCustomers/addWallet`, model);
    }

    addCustomerBonus(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v2/AdminCustomers/addBonus`, model);
    }

    addCustomerSettleBonus(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomers/addCustomerSettleBonus`, model);
    }

    updateCustomerCharge(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomers/updateCustomerCharge`, model);
    }
    blockAndUnBlockCustomer(model: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/v1/AdminCustomers/blockAndUnBlockCustomer`, model);
    }

    showCustomerResult(customerId: string, filter: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v1/AdminCustomers/showCustomerResult?customerId=${customerId}&filter=${filter}`);
    }
    getTransactionModesLoad() {
        return this._http.get<TransactionModesRoot>(`${environment.apiUrl}/api/v2/AdminCustomers/get-transaction-modes`);
    }

    getCustomerRidelist(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, selectedStatus: number, customer_Id: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminCustomers/getCustomerRideList?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&selectedStatus=${selectedStatus}&Id=${customer_Id}`);
    }
    getCustomerTransactionlist(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, customer_Id: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminCustomers/getCustomerTransList?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}&Id=${customer_Id}`);
    }
    getCustomerDetails(customer_Id) {
        return this._http.get<CustomerDetailsDtoResult>(`${environment.apiUrl}/api/v2/AdminCustomers/customerDetails?customer_Id=${customer_Id}`);
    }
}
