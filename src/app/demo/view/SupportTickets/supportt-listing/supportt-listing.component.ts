import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { SupportTicketDao } from 'src/app/demo/domain/Dao/SupportTickets/SupportTicketDao';
import { SupportTicketStatusDao } from 'src/app/demo/domain/Dao/SupportTickets/SupportTicketStatusDao';
import { SupportTicketService } from 'src/app/demo/service/supportTicketService';
import { SupportTicketMainComponent } from '../supportt-main/supportt-main.component';

@Component({
    selector: 'app-supportt-listing',
    templateUrl: './supportt-listing.component.html',
    styleUrls: ['./supportt-listing.component.scss'],
})

export class SupportTicketListingComponent implements OnInit {
    filterVal: string = ''
    selectedSupportTickets: SupportTicketDao[]
    supportTickets: SupportTicketDao[];
    supportTicketData: SupportTicketDao;
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    selectedStatus: number = 3;
    statuses: SelectItem[] = [];
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    position: string;
    disabledCategoryEndBtn: boolean = false;
    progressSpinner: boolean = false;
    filterGlobalValue:any;

    constructor(
        public main: SupportTicketMainComponent,
        private sTService: SupportTicketService,
        private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,) {
            localStorage.removeItem("SupportTicketListDao-local");
            activatedRoute.queryParams.subscribe((params: Params) => {

                const parameter = params['customdata'];
                if (parameter !== undefined) {
                  this.filterGlobalValue = parameter
                }
          
              });
    }

    ngOnInit(): void {
        this.cols = [
            { field: "date", subfield: "date", header: "Date" },
            { field: "ticket_Number", subfield: "ticket_Number", header: "Ticket Number" },
            { field: "customer.applicationUser.userName", subfield: "customer.applicationUser.userName", header: "Customer" },
            { field: "customer.applicationUser.phoneNumber", subfield: "customer.applicationUser.phoneNumber", header: "Phone" },
            { field: "vehicle.number", subfield: "vehicle.number", header: "Scooter No" },
            { field: "ticket_Issue_Type.title", subfield: "ticket_Issue_Type.title", header: "Issue Type" },
            { field: "support_Ticket_Status.title", subfield: "support_Ticket_Status.title", header: "Ticket Status" },
            { field: "Action", header: "Action" },
        ];
        this.getSupportTicketStatuses();
    }

    loadSupportTickets(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.sTService.getSupportTickets(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                this.selectedStatus
            ).then(supportT => {
                this.supportTickets = supportT.data.results;
                this.totalRecords = supportT.data.rowCount;
                this.loading = false;
            })
        }, 1000);
    }

    getSupportTicketStatuses() {
        this.sTService.getSupportTicketStatuses()
            .then(statuses => {
                statuses.forEach(item => {
                    this.statuses.push({
                        label: item.title,
                        value: item.number
                    })
                });
            })
    }

    filterBySTStatus() {
        this.loadSupportTickets(this.tableEvent);
    }

    resetDataTable(dt) {
        this.filterGlobalValue = ''
        this.selectedSupportTickets = null
        this.selectedStatus = 3
        dt.reset();
        this.filterGlobalValue =null;
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadSupportTickets(this.tableEvent);
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    statusChanged(e) {
        if(e.index == 0)
        this.selectedStatus = e.index + 3;
        else
        this.selectedStatus = e.index;
        this.loadSupportTickets(this.tableEvent);
      }
}


