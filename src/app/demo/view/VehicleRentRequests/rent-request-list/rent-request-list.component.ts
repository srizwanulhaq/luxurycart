import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { VehicleRentRequestDao } from 'src/app/demo/domain/Dao/VehicleRentRequest/vehicle-rent-requestDao';
import { VehicleRentRequestService } from 'src/app/demo/service/vehicle-rent-request.service';
import { RentRequestMainComponent } from '../rent-request-main/rent-request-main.component';

@Component({
    selector: 'app-rent-request-list',
    templateUrl: './rent-request-list.component.html',
    styleUrls: ['./rent-request-list.component.scss']
})
export class RentRequestListComponent implements OnInit {
    loading: boolean = false;
    lstRentRequests: VehicleRentRequestDao[];
    totalRecords: number;
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""
    @ViewChild(Table, { static: false }) tableEvent;

    event_status: any;
    constructor(private service: VehicleRentRequestService,
        public main: RentRequestMainComponent,
        private cdref:ChangeDetectorRef ) { 
            localStorage.removeItem("vehiclesRent-local");
        }

    ngOnInit(): void {
    }

    loadRentRequests(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getVehicleRentRequests(
                (event.first / event.rows) + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            )
                .subscribe(resp => {
                    this.lstRentRequests = resp.lstVhclRequestDto.data;
                    this.totalRecords = resp.lstVhclRequestDto.totalCount;
                });
                this.loading = false;
        }, 1000);
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        }
        this.loadRentRequests(this.tableEvent)
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("vehiclesRent-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;

    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}
