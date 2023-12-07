import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Parking_ZonesDto } from 'src/app/demo/domain/Dto/Zone/Parking_ZonesDto';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZoneMainComponent } from '../zone-main/zone-main.component';

@Component({
    selector: 'app-zone-list',
    templateUrl: './zone-list.component.html',
    styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

    _lstZones: Parking_ZonesDto[];
    zoneModel: Parking_ZonesDto;
    event_status: any;
    totalRecords: number;
    @ViewChild(Table, { static: false }) tableEvent;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    selectedStatus: number = 2;
    startDate: string = ""
    endDate: string = ""
    loading: boolean = false;
    cardItems: MenuItem[];
    zoneId: string;
    e: Event;
    constructor(private service: ZoneService, public main: ZoneMainComponent,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdref: ChangeDetectorRef) {
        localStorage.removeItem("zoneistDAO-local");


        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter
            }
        });
    }

    ngOnInit(): void {
        // this.getAllZonesMap();

        this.cardItems = [
            {
                label: "Options",
                items: [
                    {
                        label: "Details",
                        icon: "pi pi-globe",

                    }
                ]
            },

        ];
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadZones(this.tableEvent);
        }
    }
    // getAllZonesMap() {
    //   this.service.getAllZonesMap().pipe(first()).subscribe({
    //     next: response => {
    //       this._lstZones = response;

    //     },
    //     error: error => {
    //     }

    //   });

    // }

    loadZones(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getAllZonesMap(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this._lstZones = res.results;
                this._lstZones.map(z => z.zone_Coordinates.sort((a, b) => a.sequence > b.sequence ? 1 : -1));
                this.totalRecords = res.rowCount;
                this.loading = false;
            })
        }, 1000);
    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("zoneistDAO-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/zones/zone-main"]);

    }
    statusChanged(e) {

        if (e.index == 0)
            this.selectedStatus = e.index + 2;
        if (e.index == 1)
            this.selectedStatus = e.index + 0;
        if (e.index == 2)
            this.selectedStatus = e.index - 2;
        this.loadZones(this.tableEvent);
    }
    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadZones(this.tableEvent)
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}