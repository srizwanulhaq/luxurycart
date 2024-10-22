import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZonePriceMainComponent } from '../../ZonePrice/zone-price-main/zone-price-main.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { SimpleProjectDao } from 'src/app/demo/domain/Dao/Projects/projects';
import { Parking_ZonesDto } from 'src/app/demo/domain/Dto/Zone/Parking_ZonesDto';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-zone-price-list',
  templateUrl: './zone-price-list.component.html',
  styleUrls: ['./zone-price-list.component.scss']
})
export class ZonePriceListComponent implements OnInit {

  selectedProject: SimpleProjectDao;
    projectlist: SimpleProjectDao[]
    _lstZones: Parking_ZonesDto[];
    zoneModel: Parking_ZonesDto;
    event_status: any;
    totalRecords: number;
    @ViewChild(Table, { static: false }) tableEvent;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    selectedStatus: number = 1;
    startDate: string = ""
    endDate: string = ""
    loading: boolean = false;
    cardItems: MenuItem[];
    zoneId: string;
    e: Event;
    constructor(private service: ZoneService, public main: ZonePriceMainComponent,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cdref: ChangeDetectorRef,
        public Projectservice:ProjectsService) {
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
        this.initialData();
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
    initialData() {
        this.Projectservice.getProjectDropdowns()
            .then(res => {
                this.projectlist
                this.projectlist = res
                if (res.length > 0) {
                    this.projectlist.find(z => z.id == "1001")["id"] = ""
                    this.selectedProject = res[0]
                    this.loadZones(this.tableEvent)
                }
            })
    }

    changeProject(e) {
        this.selectedProject= this.projectlist.find(zone => zone.id == e.value)
        setTimeout(() => {
            this.loadZones(this.tableEvent)
        }, 500)
    }
    loadZones(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getAllZonePrice(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                this.selectedProject?.id,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
              
                this._lstZones = res.results;
                console.log(this._lstZones);
                //this._lstZones.map(z => z.zone_Coordinates.sort((a, b) => a.sequence > b.sequence ? 1 : -1));
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
    onChange(){
      this.ngOnInit();
    }
}