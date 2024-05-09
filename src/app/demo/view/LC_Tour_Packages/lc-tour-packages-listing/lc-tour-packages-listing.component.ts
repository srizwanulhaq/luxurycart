import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { LCTourPackage } from 'src/app/demo/domain/Dao/LCTourPackage/lc-tour-package.model';
import { LCTourPackagesMainComponent } from '../lc-tour-packages-main/lc-tour-packages-main.component';
import { LCTourPackageService } from 'src/app/demo/service/lc-tour-package.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lc-tour-packages-listing',
  templateUrl: './lc-tour-packages-listing.component.html',
  styleUrls: ['./lc-tour-packages-listing.component.scss']
})
export class LCTourPackagesListingComponent implements OnInit {

  startDate: string="";
  endDate: string="";
  searchValue: "";
  totalRecords: any;
  loading: boolean;
  packages: LCTourPackage[];
  event_status: LazyLoadEvent;

 
  @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    filterGlobalValue: any;
  currentUserName: any;
rowsPerPageOptions: any;
cols: any;

    constructor(public main: LCTourPackagesMainComponent, 
      private service: LCTourPackageService, 
      private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute) {
            localStorage.removeItem("lstLCPackages-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter;
            }
        });
    }

    ngOnInit(): void { }

    loadPackages(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
            this.service.getAllPackages(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").then(res => {
                    this.packages = res.results;
                    this.totalRecords = res.rowCount;
                    this.loading = false;
                })
        


    }
    resetDataTable(dt) {
        localStorage.removeItem("lstLCPackages-local");
        dt.reset();
        this.searchValue = null;
        this.filterGlobalValue = null;
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadPackages(this.tableEvent);
        }
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
