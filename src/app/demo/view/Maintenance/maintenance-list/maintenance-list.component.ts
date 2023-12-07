import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MaintenanceDao } from 'src/app/demo/domain/Dao/Maintenance/maintenance-dao';
import { MaitenanceService } from 'src/app/demo/service/maitenance.service';
import { MaintenanceMainComponent } from '../maintenance-main/maintenance-main.component';

@Component({
    selector: 'app-maintenance-list',
    templateUrl: './maintenance-list.component.html',
    styleUrls: ['./maintenance-list.component.scss'],
    providers: [MessageService],
})
export class MaintenanceListComponent implements OnInit {
    lstMaintenance: MaintenanceDao[];
    event_Status: any;
    loading: boolean;
    totalRecords: number;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any
    startDate: string = ""
    endDate: string = ""

    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    constructor(private _service: MaitenanceService, public main: MaintenanceMainComponent, private router: Router) {
        localStorage.removeItem("maintenanceList-local");
    }

    ngOnInit(): void {
    }


    loadMaintenanceLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.event_Status = event;
        setTimeout(() => {
            this._service
                .getAll(
                    event.first / event.rows + 1,
                    event.rows,
                    event.globalFilter,
                    event.sortField,
                    event.sortOrder,
                    !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
                )
                .subscribe((resp) => {
                    this.lstMaintenance = resp.data.results;
                    this.totalRecords = resp.data.rowCount;
                    this.loading = false;
                });
        }, 1000);
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadMaintenanceLazy(this.tableEvent);
        }
    }
    resetDataTable(dt) {
        localStorage.removeItem("maintenanceList-local");
        dt.reset(); // reset the table
        this.event_Status.globalFilter = "";
        this.router.navigate(["/maintenance/maintenance-main"]);
        this.filterGlobalValue = null;
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadMaintenanceLazy(this.tableEvent)
    }
}
