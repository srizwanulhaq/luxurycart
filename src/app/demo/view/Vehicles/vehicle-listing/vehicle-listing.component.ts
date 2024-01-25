import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Vehicles } from 'src/app/demo/domain/Dao/Vehicle/Vehicles';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { SimpleProjectDao } from 'src/app/demo/domain/Dao/Projects/projects';
@Component({
    selector: 'app-vehicle-listing',
    templateUrl: './vehicle-listing.component.html',
    styleUrls: ['./vehicle-listing.component.scss'],
})
export class VehicleListingComponent implements OnInit {
    cols: any[];
    selectedProject: SimpleProjectDao;
    projectlist: SimpleProjectDao[]
    statuses: SelectItem[] = [];
    states: SelectItem[] = [];
    selectedStatus: number = 7
    vehicles: Vehicles[];
    totalRecords: number;
    loading: boolean = false;
    rowsPerPageOptions = [10, 25, 50];
    event_status: any;
    @ViewChild(Table, { static: false }) tableEvent;
    @Output() eventChange = new EventEmitter<Event>();
    @Output("vehicleSelection") vehicleSelect = new EventEmitter<string[]>()
    filterGlobalValue: any;
    selectedVehicles: Vehicles[] = []
    startDate: string = ""
    endDate: string = ""
    selectedStats: number;
    defaultIndex: number;
    paramStatus = 0;

    constructor(private service: VehicleService,
        public main: VehicleMainComponent,
        private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public Projectservice:ProjectsService) {
      
        localStorage.removeItem("vehiclesListDAO-local");
        activatedRoute.queryParams.subscribe((params: Params) => {
            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter
            }
            if (params.hasOwnProperty("status")) {
                this.paramStatus = params.status
                this.selectedStatus = params.status;
            }
            if (params.hasOwnProperty("startDate") && params.hasOwnProperty("endDate")) {
                this.startDate = params.startDate.toString()
                this.endDate = params.endDate.toString()
            }
        });

    }

    ngOnInit(): void {
        
        this.initialData();
        this.loadDropdownValues()
    }

    loadDropdownValues() {
        this.service.getStatus().subscribe(responseList => {
            const temp = responseList[0].map(el => ({ label: el.title, value: el.number }))
            temp.splice(-2, 1)
            temp.splice(0, 0, temp.splice(temp.findIndex(status => (status.label).toLowerCase() == "all"), 1)[0])
            this.statuses = temp.filter(x => x.value != 9 && x.value != 8 && x.value != 10 && x.value != 11 && x.value != 12 && x.value != 14)
            this.states = temp.filter(x => x.value != 1 && x.value != 2 && x.value != 3 && x.value != 4 && x.value != 5 && x.value != 6 && x.value != 7 && x.value != 9 && x.value != 8 && x.value != 10)
            this.states.unshift({ label: 'All', value: 7 });

            if (!!this.paramStatus) {
                const stat = this.states.findIndex(ss => ss.value == this.paramStatus)
                const status = this.statuses.findIndex(ss => ss.value == this.paramStatus)
                this.selectedStats = stat < 0 ? 0 : stat
                this.defaultIndex = status < 0 ? 0 : status
               
            }
        });
    }


    loadVehicles(event: LazyLoadEvent) {
        this.event_status = event;
        this.loading = true;
        setTimeout(() => {
            this.service.getScooters(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                this.selectedProject?.id,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.vehicles = res.results;
                //console.log(this.vehicles)
                this.totalRecords = res.rowCount;
                if (this.vehicles) {
                    for (var i = 0; i < this.vehicles.length; i++) {
                        this.vehicles[i].time_Status = new Date(this.vehicles[i].lastUpdatedTime * 1000);
                    }
                }
                if (this.selectedVehicles.length > 0) {
                    this.onToggleSelection()
                }
                this.loading = false;
            })
        }, 1000);
    }


    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadVehicles(this.tableEvent);
            if (this.selectedVehicles.length > 0) {
                this.resetSelection()
            }
        }
    }
    initialData() {
        this.Projectservice.getProjectDropdowns()
            .then(res => {
                this.projectlist
                this.projectlist = res
                if (res.length > 0) {
                    this.projectlist.find(z => z.id == "1001")["id"] = ""
                    this.selectedProject = res[0]
                    //this.loadVehicles(this.tableEvent)
                }
            })
            console.log(this.projectlist)
    }

    changeProject(e) {
        this.selectedProject= this.projectlist.find(zone => zone.id == e.value)
        setTimeout(() => {
            this.loadVehicles(this.tableEvent)
        }, 500)
    }
    statusChanged(e) {
        this.selectedStatus = this.statuses[e.index].value;
        this.loadVehicles(this.tableEvent);
        this.selectedStats = 0;

    }
    statesChanged(e) {
        this.selectedStatus = this.states[e.index].value;
        this.loadVehicles(this.tableEvent);
        this.defaultIndex = 0;
    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("vehiclesListDAO-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/vehicles/vehicle-main"]);
        this.selectedStatus = 7;
        this.selectedStats = 0;
        this.defaultIndex = 0;
    }

    onToggleSelection() {
        this.vehicleSelect.emit(this.selectedVehicles.map(v => v.number.toString()))
    }

    resetSelection() {
        this.selectedVehicles = []
        if (localStorage.hasOwnProperty("vehiclesListDAO-local")) {
            const obj = JSON.parse(localStorage.getItem("vehiclesListDAO-local"))
            obj.selection = []
            localStorage.setItem("vehiclesListDAO-local", JSON.stringify(obj))
        }
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        }
        this.loadVehicles(this.tableEvent)
    }

}
