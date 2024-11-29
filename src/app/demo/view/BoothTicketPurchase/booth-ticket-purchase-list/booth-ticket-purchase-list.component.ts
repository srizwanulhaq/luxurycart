import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BoothTicketdao } from 'src/app/demo/domain/Dao/BoothTicket/BoothTicketdao';
import { BoothTicketService } from 'src/app/demo/service/boothTicketService';

@Component({
  selector: 'app-booth-ticket-purchase-list',
  templateUrl: './booth-ticket-purchase-list.component.html',
  styleUrls: ['./booth-ticket-purchase-list.component.scss'],
})
export class BoothTicketPurchaseListComponent implements OnInit {
  loading: boolean;
  lstTransactions: BoothTicketdao[] = [];
  totalRecords: number = 0;
  startDate: string = '';
  endDate: string = '';
  searchValue: any;
  selectedStatus: number = 1; // 0: All, 1: Active, 2: Expired (Deactive)
  selectedRows: BoothTicketdao[] = [];
  filterGlobalValue: any = null;
  @ViewChild(Table, { static: false }) tableEvent;
  rowsPerPageOptions = [10, 25, 50];
  cols: any[];

  constructor(private boothService: BoothTicketService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'qty', header: 'Quantity' },
      { field: 'amount', header: 'Amount' },
      { field: 'payment_Mode', header: 'Payment Mode' },
      { field: 'vehicle_Type_Id', header: 'Vehicle Type' },
      { field: 'customer_Reference', header: 'Customer Reference' },
      { field: 'reference_Id', header: 'Reference ID' },
      { field: 'purchase_Date', header: 'Purchase Date' },
      { field: 'created_Date', header: 'Created Date' },
      { field: 'updated_At', header: 'Updated At' },
    ];
  }

  // Lazy load function for table data
  loadTransactionLazy(event: LazyLoadEvent) {
    this.loading = true;

    const pageIndex = Math.floor(event.first / event.rows) + 1;

    this.boothService
      .getAllBoothsRecords(
        pageIndex,
        event.rows, 
        this.filterGlobalValue,
        event.sortField,
        event.sortOrder,
        this.selectedStatus, // Send the selected status filter
        !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
      )
      .then(res => {
        console.log('API Response:', res);

        if (res.results.length === 0) {
          this.lstTransactions = [];
        } else {
          this.lstTransactions = res.results || [];
        }

        this.totalRecords = res.rowCount || 0;
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.error('Error loading booth ticket records:', error);
      });
  }

  // Reset data table and clear local storage
  resetDataTable(dt: Table) {
    localStorage.removeItem("lstTransactions-local");
    dt.reset();  // Reset the table state
    this.filterGlobalValue = null;  // Clear global filter value
    this.startDate = '';  // Clear start date
    this.endDate = '';  // Clear end date
    this.loadTransactionLazy({ first: 0, rows: 10, sortField: null, sortOrder: 1 });  // Reload data after reset
  }

  // Handle date range change
  onRangeChange(reset: boolean) {
    if (reset) {
      this.startDate = '';
      this.endDate = '';
    }
    this.loadTransactionLazy(this.tableEvent); // Reload data after date change
  }

  // Handle status change
  statusChanged(e: any) {
    if (e.index === 1) {
      this.selectedStatus = 1; // Active
    } else if (e.index === 2) {
      this.selectedStatus = 2; // Expired (Deactive)
    } else {
      this.selectedStatus = 0; // All
    }

    // Reload data after status change
    this.loadTransactionLazy(this.tableEvent);
  }
}
