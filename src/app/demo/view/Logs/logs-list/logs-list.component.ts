
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { logsDetail } from 'src/app/demo/domain/Dto/logs';

import { LogsService } from 'src/app/demo/service/logs.service';
import { LogsMainComponent } from '../logs-main/logs-main.component';
@Component({
    selector: 'app-logs-list',
    templateUrl: './logs-list.component.html',
    styleUrls: ['./logs-list.component.scss'],
    providers: [MessageService],
})
export class LogsListComponent implements OnInit {
    logsservice: logsDetail[];
    event_status: any;
    event_Status: any;
    loading: boolean = false;
    statuses: any[];
    selectedStatus: number = 1;
    totalRecords: number;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any
    startDate: string = ""
    endDate: string = ""
    constructor(private _service: LogsService, private router: Router, public main: LogsMainComponent) {

    }


    ngOnInit(): void {
        this.statuses = [
            { label: "Customer", value: 1 },
            { label: "Manager", value: 2 },
            { label: "Admin", value: 3 }
        ];
    }

    statusChanged(e) {
        if (e.index == 0)
            this.selectedStatus = e.index + 1;
        if (e.index == 1)
            this.selectedStatus = e.index + 1;
        if (e.index == 2)
            this.selectedStatus = e.index + 1;

        this.loadDatalogs(this.tableEvent);
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadDatalogs(this.tableEvent);
        }
    }
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    resetDataTable(dt) {
        localStorage.removeItem("logs-local");
        dt.reset(); // reset the table
        this.event_status.globalFilter = "";
        //this.router.navigate(["/log/manage-iot-main"]);
        this.filterGlobalValue = null;
    }
    loadDatalogs(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this._service.GetLogsList(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.logsservice = res.results;
                this.totalRecords = res.rowCount;
                this.loading = false;
            })
        }, 1000);
    }
}
