import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PackagesService } from 'src/app/demo/service/packages.service';
import { PackagesMainComponent } from '../packages-main/packages-main.component';
import { Packages } from 'src/app/demo/domain/Dao/Tours/packages';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-packages-listing',
  templateUrl: './packages-listing.component.html',
  styleUrls: ['./packages-listing.component.scss']
})
export class PackagesListingComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstPackages: Packages[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: PackagesService,
    private cdref: ChangeDetectorRef,
    public main:PackagesMainComponent) { 
      localStorage.removeItem("PackageListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPackages(this.tableEvent);
    }
  }

  loadPackages(event: LazyLoadEvent) {
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
          console.log(res)
            this.lstPackages = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("PackageListDao-local");
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
  } this.loadPackages(this.tableEvent)
}

}
