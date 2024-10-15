import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Transactiondao } from 'src/app/demo/domain/Dao/Transaction/transactiondao';
import { TransactionService } from 'src/app/demo/service/transaction.service';

@Component({
  selector: 'app-taxi-list',
  templateUrl: './taxi-list.component.html',
  styleUrls: ['./taxi-list.component.scss']
})
export class TaxiListComponent implements OnInit {
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
  
  constructor( private transactionService: TransactionService,) { }

  ngOnInit(): void {
  }
  loadTransactionLazy(event: LazyLoadEvent) {
    this.event_status = event;
    this.loading = true;
    setTimeout(() => {
      debugger;
        this.transactionService.getAllTaxiRecords(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
          debugger;
            this.lstTransactions = res.results;
            this.lstTransactions.sort((a, b) => a.serial_No > b.serial_No ? -1 : 1);
            this.totalRecords = res.rowCount;
            // this.total_debit = res.total_Debit;
            // this.total_credit = res.total_Credit;
            this.loading = false;
        })
    }, 1000);
}
onRangeChange(reset) {
  if (reset) {
      this.startDate = ""
      this.endDate = ""
  } this.loadTransactionLazy(this.tableEvent)
}

onDateChange(data) {
  this[`${data.type}Date`] = data.date
}
}
