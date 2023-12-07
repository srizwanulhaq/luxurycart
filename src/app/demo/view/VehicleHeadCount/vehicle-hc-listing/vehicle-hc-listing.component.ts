import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { VehicleHeadCountMainComponent } from '../vehicle-hc-main/vehicle-hc-main.component';
import { Subject } from 'rxjs';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleHeadCountDao } from 'src/app/demo/domain/Dao/Vehicle/VehicleHeadCountDao';
@Component({
    selector: 'app-vehicle-hc-listing',
    templateUrl: './vehicle-hc-listing.component.html',
    styleUrls: ['./vehicle-hc-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VehicleHeadCountListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    vehiclehcs: VehicleHeadCountDao[]
    selectVehicles: VehicleHeadCountDao[] = []
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any = "";
    showCreateBtn: boolean = false
    @Output("vehicleSelection") vehicleSelect = new EventEmitter<string>()

    constructor(public main: VehicleHeadCountMainComponent, private service: VehicleService, private loaderService: LoaderService) {

        localStorage.removeItem("vehicleHCList-local");
    }

    ngOnInit(): void { }

    @Input()
    set event(event: Event) {
        if (event) {
            localStorage.removeItem("vehicleHCList-local")
            this.loadVehicleHeadCounts(this.tableEvent);
        }
    }

    loadVehicleHeadCounts(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getAllVehicleHeadCounts(event.first / event.rows + 1,
                event.rows,
                this.searchValue,
                event.sortField,
                event.sortOrder).then(resp => {
                    this.vehiclehcs = resp.list
                    this.totalRecords = resp.total_count
                    this.loading = false;
                })
            if (this.selectVehicles.length == 1) {
                this.toShowCreateButton()
            }
        }, 1000);
    }

    resetDataTable(dt) {
        localStorage.removeItem("vehicleHCList-local")
        this.searchValue = ""
        dt.reset();
    }

    toShowCreateButton() {
        if (this.selectVehicles.length == 1 && !this.showCreateBtn) {
            this.showCreateBtn = true
            this.vehicleSelect.emit(this.selectVehicles[0].vehicle_no)
        } else if (this.selectVehicles.length != 1 && this.showCreateBtn) {
            this.showCreateBtn = false
            this.vehicleSelect.emit("")
        }
    }
}


