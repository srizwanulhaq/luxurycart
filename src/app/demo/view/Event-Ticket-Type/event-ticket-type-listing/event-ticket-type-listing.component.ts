import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { EventTicketType } from 'src/app/demo/domain/Dao/Event-Ticket-Type/event-ticket-type-dao';
import { EventTicketTypeService } from 'src/app/demo/service/event-ticket-type.service';
import { EventTicketTypeMainComponent } from '../event-ticket-type-main/event-ticket-type-main.component';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-event-ticket-type-listing',
  templateUrl: './event-ticket-type-listing.component.html',
  styleUrls: ['./event-ticket-type-listing.component.scss']
})
export class EventTicketTypeListingComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lsttickettype: EventTicketType[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: EventTicketTypeService,
    private cdref: ChangeDetectorRef,
    public main:EventTicketTypeMainComponent) { 
      localStorage.removeItem("event-ticketListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadData(this.tableEvent);
    }
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
        this.service.getAll(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
            this.lsttickettype = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("event-ticketListDao-local");
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
  } this.loadData(this.tableEvent)
}
}
