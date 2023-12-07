import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TransactionService } from 'src/app/demo/service/transaction.service';
import { Transactiondao } from '../../../domain/Dao/Transaction/transactiondao';
import { TransactionMainComponent } from '../transaction-main/transaction-main.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
    providers: [MessageService, ConfirmationService, DatePipe],
})
export class TransactionListComponent implements OnInit {


    loading: boolean;
    lstTransactions: Transactiondao[];
    totalRecords: number;
    total_debit: number;
    total_credit: number;
    cols: any[];
    exportColumns: any[];
    rowsPerPageOptions = [10, 25, 50];
    startDate: string = ""
    endDate: string = ""
    @ViewChild(Table, { static: false }) tableEvent;
    searchValue: any;
    filterGlobalValue: any = null;
    event_status:any;

    constructor(
        private transactionService: TransactionService,
        public main: TransactionMainComponent, private datepipe: DatePipe) {
            localStorage.removeItem("lstTransactions-local");
         }

    ngOnInit(): void {
        this.loading = true;
    }

    loadTransactionLazy(event: LazyLoadEvent) {
        this.event_status = event;
        this.loading = true;
        setTimeout(() => {
            this.transactionService.getAllTransactionsV2(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.lstTransactions = res.results;
                this.lstTransactions.sort((a, b) => a.serial_No > b.serial_No ? -1 : 1);
                this.totalRecords = res.rowCount;
                this.total_debit = res.total_Debit;
                this.total_credit = res.total_Credit;
                this.loading = false;
            })
        }, 1000);
    }
    resetDataTable(dt) {
        localStorage.removeItem("lstTransactions-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.filterGlobalValue = null;
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadTransactionLazy(this.tableEvent)
    }
}
