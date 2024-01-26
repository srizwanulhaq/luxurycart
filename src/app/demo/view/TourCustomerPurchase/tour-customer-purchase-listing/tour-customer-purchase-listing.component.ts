import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PointsMainComponent } from '../../Points/points-main/points-main.component';
import { TourCustomerPurchaseService } from 'src/app/demo/service/tour-customer-purchase.service';
import { Table } from 'primeng/table';
import { TourCustomerPurchase } from 'src/app/demo/domain/Dao/Tours/tour-customer-purchase';
import { TourCustomerPurchaseMainComponent } from '../tour-customer-purchase-main/tour-customer-purchase-main.component';

@Component({
  selector: 'app-tour-customer-purchase-listing',
  templateUrl: './tour-customer-purchase-listing.component.html',
  styleUrls: ['./tour-customer-purchase-listing.component.scss']
})
export class TourCustomerPurchaseListingComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstPurchases: TourCustomerPurchase[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: TourCustomerPurchaseService,
    private cdref: ChangeDetectorRef,
    public main:TourCustomerPurchaseMainComponent) { 
      localStorage.removeItem("PurchaseListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadTourCustomerPurchase(this.tableEvent);
    }
  }

  loadTourCustomerPurchase(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
        this.service.getAllPurchases(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
          console.log(res)
            this.lstPurchases = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("PurchaseListDao-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}
onDateChange(data) {
  this[`${data.type}Date`] = data.date
}

onRangeChange(reset) {
  if (reset) {
      this.startDate = ""
      this.endDate = ""
  } this.loadTourCustomerPurchase(this.tableEvent)
}
}
