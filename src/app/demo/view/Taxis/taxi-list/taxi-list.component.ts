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
  ALL_lstTransactions: Transactiondao[];
  totalRecords: number;
  ALL_totalRecords: number;
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
  selectedStatus:number=0;
  
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
            this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            this.selectedStatus,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
          debugger;
            this.lstTransactions = res.results// Sort by serial_No

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
statusChanged(e:any){
debugger;
  if(e.index == 2){
          this.selectedStatus=1;
  }else if(e.index == 0){
    this.selectedStatus=null;
  }else{
    this.selectedStatus=0;
  }
  this.loadTransactionLazy(this.tableEvent);
}
}
