import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { TransactionResponse, TransactionResponseV2 } from '../domain/Dao/Transaction/transactiondao';
import { TransactionDetailsDtoResult } from '../domain/Dto/Transactions/TransactionDetailsDto';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(private _http: HttpClient) { }

    getAllTransactions(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, dateRangeStr: string) {
        return this._http.get<TransactionResponse>(`${environment.apiUrl}/api/v2/AdminTransaction/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`);
    }
    getTransactionDetails(customer_Id, transId) {
        return this._http.get<TransactionDetailsDtoResult>(`${environment.apiUrl}/api/v2/AdminTransaction/transDetails?customer_Id=${customer_Id}&transId=${transId}`);
    }
    getAllTransactionsV2(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number, dateRangeStr: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminTransaction/All?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}${dateRangeStr}`)
        .toPromise()
        .then(res => res as TransactionResponseV2)
        .then(data => data.data);
    }
    getAllTaxiRecords(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number,selectedStatus:number, dateRangeStr: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminTransaction/AllTaxiRecords?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&selectedStatus=${selectedStatus}&globalFilter=${globalFilter}${dateRangeStr}`)
        .toPromise()
        .then(res => res as TransactionResponseV2)
        .then(data => data.data);
    }
    getAllTourRecords(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number,selectedStatus:number, dateRangeStr: string) {
        return this._http.get<any>(`${environment.apiUrl}/api/v2/AdminTransaction/AllTourRecords?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&selectedStatus=${selectedStatus}&globalFilter=${globalFilter}${dateRangeStr}`)
        .toPromise()
        .then(res => res as TransactionResponseV2)
        .then(data => data.data);
    }
    
}
