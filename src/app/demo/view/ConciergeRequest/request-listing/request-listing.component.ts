import { Component, EventEmitter, OnInit, Output, ViewChild,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciergeRequestService } from 'src/app/demo/service/concierge-request.service';
import { RequestMainComponent } from '../request-main/request-main.component';
import { ConciergeRequest } from 'src/app/demo/domain/Dao/Concierge/concierge-request';
import { Table } from 'primeng/table';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-request-listing',
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss']
})
export class RequestListingComponent implements OnInit {
  loading: boolean = false;
  event_status: any;
  request: ConciergeRequest[];
  totalRecords: number;
  rowsPerPageOptions = [10, 25, 50];
  filterGlobalValue: any;
  startDate: string = ""
  endDate: string = ""
  statuses: SelectItem[] = [];
  selectedStatus: number = 7
  paramStatus = 0;
  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;


  @Input()
  set event(event: Event) {
      if (event) {
          this.loadRequestLazy(this.tableEvent);
      }
  }

  constructor(private service: ConciergeRequestService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      public main: RequestMainComponent,) {
      localStorage.removeItem("requestList-local");
  }
  
  ngOnInit(): void {
    this.loadDropdownValues();
  }

  loadDropdownValues() {
    this.service.getStatus().subscribe(responseList => {
        const temp = responseList[0].map(el => ({ label: el.title, value: el.number }))
        temp.unshift({ label: 'All', value: 7 });
        this.statuses =temp;

        if (!!this.paramStatus) {
            const stat = this.statuses.findIndex(ss => ss.value == this.paramStatus)
            const status = this.statuses.findIndex(ss => ss.value == this.paramStatus)
            this.selectedStatus = stat < 0 ? 0 : stat
           
        }
    });
}
statesChanged(e) {
  this.selectedStatus = this.statuses[e.index].value;
  this.loadRequestLazy(this.tableEvent);
  //this.defaultIndex = 0;
}
  loadRequestLazy(event: LazyLoadEvent) 
  {
    this.event_status = event;
    setTimeout(() => {
        this.loading = true;
        this.service.getAllRequests(
          event.first / event.rows + 1,
          event.rows,
          event.globalFilter ?? this.filterGlobalValue,
          event.sortField,
          event.sortOrder,
          this.selectedStatus,
          !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
      ).then((response) => {
          this.request = response.results;
          this.totalRecords = response.rowCount;
          this.loading=false;
      });
    }, 500);
  }

  
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("requestList-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/concierge-request/concierge-request-main"]);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadRequestLazy(this.tableEvent)
    }
}
