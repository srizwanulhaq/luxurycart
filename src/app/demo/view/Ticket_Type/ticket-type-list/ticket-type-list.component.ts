import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { TicketTypeMainComponent } from '../ticket-type-main/ticket-type-main.component';
import { TicketTypeService } from 'src/app/demo/service/ticket-type.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TicketType } from 'src/app/demo/domain/Dao/TicketType/ticket-type.model';

@Component({
  selector: 'app-ticket-type-list',
  templateUrl: './ticket-type-list.component.html',
  styleUrls: ['./ticket-type-list.component.scss']
})
export class TicketTypeListComponent implements OnInit {
  startDate: string="";
  endDate: string="";
  searchValue: "";
  totalRecords: any;
  loading: boolean;
  ticket_type: TicketType[];
  event_status: LazyLoadEvent;

 
  @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    filterGlobalValue: any;
  currentUserName: any;
rowsPerPageOptions: any;
cols: any;

    constructor(public main: TicketTypeMainComponent, private service: TicketTypeService, 
      private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute) {
            localStorage.removeItem("lstTicketType-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter;
            }
        });
    }

    ngOnInit(): void { }

    loadTicketType(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
            this.service.getAllTicketType(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").then(res => {
                    this.ticket_type = res.results;
                    this.totalRecords = res.rowCount;
                    this.loading = false;
                })
        


    }
    resetDataTable(dt) {
        localStorage.removeItem("lstTicketType-local");
        dt.reset();
        this.searchValue = null;
        this.filterGlobalValue = null;
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadTicketType(this.tableEvent);
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
        } this.loadTicketType(this.tableEvent)
    }
}
