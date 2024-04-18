import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { Subject } from 'rxjs';
import { VehicleTypedao } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { VehicleTypeDto } from 'src/app/demo/domain/Dto/Vehicles/VehicleDto';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vtype-listing',
    templateUrl: './vtype-listing.component.html',
    styleUrls: ['./vtype-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VehicleTypeListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    vehicleTypes: VehicleTypedao[]
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any;
    filterGlobalValue: any;
    @Output() formCall = new EventEmitter<VehicleTypeDto>();
    startDate: string = ""
    endDate: string = ""

    constructor(private service: VehicleService, private messageService: MessageService, 
        private loaderService: LoaderService, private cdref: ChangeDetectorRef) {
        localStorage.removeItem("vehicleTypeDao-local");
    }

    ngOnInit(): void { }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadList(this.tableEvent);
        }
    }

    loadList(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getVehicleTypes(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(resp => {
                if (resp.status) {
                    this.vehicleTypes = resp.data.vehicle_types
                    this.totalRecords = resp.data.total_numer
                }
                this.loading = false;
            })
        }, 1000);
    }

    toggleItem(id: string) {
        this.loading = true;
        setTimeout(() => {
            this.service.toggleVehicleType(id)
                .then(resp => {
                    if (resp.status) {
                        const temp = this.vehicleTypes.find(vc => vc.id == id)
                        temp.active = !temp.active
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    } else {
                    }
                }).catch((e: any) => {
                    console.log(e);
                }).finally(() => {
                    this.loading = false;
                })
        }, 1000)
    }

    formData(id?: string) {
        let template = undefined
        if (!!id) {
            template = this.vehicleTypes.find(vc => vc.id == id)
        }
        this.formCall.emit(template)
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadList(this.tableEvent)
    }

    setToggleClass(active: boolean) {
        return active ? 'btn-success' : 'btn-danger'
    }

    resetDataTable(dt) {
        localStorage.removeItem("vehicleTypeDao-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.filterGlobalValue = null;
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}
