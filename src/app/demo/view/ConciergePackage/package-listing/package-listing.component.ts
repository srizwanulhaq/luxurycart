import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConciergePackages } from 'src/app/demo/domain/Dao/Concierge/concierge-packages';
import { ConciergePackageService } from 'src/app/demo/service/concierge-package.service';
import { PackageMainComponent } from '../package-main/package-main.component';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-package-listing',
  templateUrl: './package-listing.component.html',
  styleUrls: ['./package-listing.component.scss']
})
export class PackageListingComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstPackages: ConciergePackages[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: ConciergePackageService,
    public main: PackageMainComponent,
    private cdref: ChangeDetectorRef) { 
      localStorage.removeItem("packageListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPackage(this.tableEvent);
    }
  }

  loadPackage(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
        this.service.getAllPackages(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
            this.lstPackages = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("packageListDao-local");
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
  } this.loadPackage(this.tableEvent)
}
}
