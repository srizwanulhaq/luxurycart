import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { Subject } from 'rxjs';
import { VehicleCompanydao } from 'src/app/demo/domain/Dao/Vehicle/VehicleCompanydao';
import { VehicleCompanyDto } from 'src/app/demo/domain/Dto/Vehicles/VehicleDto';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vcompany-listing',
    templateUrl: './vcompany-listing.component.html',
    styleUrls: ['./vcompany-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VehicleCompanyListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    vehicleCompanies: VehicleCompanydao[]
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any;
    filterGlobalValue: any;
    @Output() formCall = new EventEmitter<VehicleCompanyDto>();
    startDate: string = ""
    endDate: string = ""

    constructor(private service: VehicleService, private messageService: MessageService, private loaderService: LoaderService) {
        localStorage.removeItem("vehicleCompanyDao-local");
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
            this.service.getVehicleCompanies(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(resp => {
                if (resp.status) {
                    this.vehicleCompanies = resp.data.vehicle_companies
                    this.totalRecords = resp.data.total_numer
                }
                this.loading = false;
            })
        }, 1000);
    }

    toggleItem(id: string) {
        this.loading = true;
        setTimeout(() => {
            this.service.toggleVehicleCompany(id)
                .then(resp => {
                    if (resp.status) {
                        const temp = this.vehicleCompanies.find(vc => vc.id == id)
                        temp.active = !temp.active
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: resp.message, life: 3000 });
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
            template = this.vehicleCompanies.find(vc => vc.id == id)
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
        localStorage.removeItem("vehicleCompanyDao-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.filterGlobalValue = null;
    }
}
