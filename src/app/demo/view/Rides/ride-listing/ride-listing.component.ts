import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { Ridedao } from 'src/app/demo/domain/Dao/Rides/Ridedao';
import { EndRideDto } from 'src/app/demo/domain/Dto/Rides/EndRideDto';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { RideService } from 'src/app/demo/service/rideservice';
import { RideMainComponent } from '../ride-main/ride-main.component';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { SimpleProjectDao } from 'src/app/demo/domain/Dao/Projects/projects';

@Component({
    selector: 'app-ride-listing',
    templateUrl: './ride-listing.component.html',
    styleUrls: ['./ride-listing.component.scss'],
    providers: [MessageService, ConfirmationService, DatePipe],
})
export class RideListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    visibleSidebar4;
    selectedProject: SimpleProjectDao;
    projectlist: SimpleProjectDao[]
    rides: Ridedao[];
    selectedRides: Ridedao[] = [];
    endRide: EndRideDto;
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    selectedStatus: number = 1;
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    position: string;
    disabledrideEndBtn: boolean = false;
    progressSpinner: boolean = false;
    searchValue: any;
    event_status: any;
    activeRidecount: number;
    filterGlobalValue: any;
    showEndBtn: boolean = false
    startDate: string = ""
    endDate: string = ""

    constructor(public main: RideMainComponent, private service: RideService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef,
        private loaderService: LoaderService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public Projectservice:ProjectsService) {
        localStorage.removeItem("ridesListDAO-local");
        activatedRoute.queryParams.subscribe((params: Params) => {
            const customData = params['customdata'];
            const status = params['status'];

            if (customData !== undefined) {
                this.searchValue = customData
            }
            if (!!status) {
                this.selectedStatus = status
            }
            if (params.hasOwnProperty("startDate") && params.hasOwnProperty("endDate")) {
                this.startDate = params.startDate.toString()
                this.endDate = params.endDate.toString()
            }

        });
    }

    ngOnInit(): void {
        this.initialData();
        this.statuses = [
            { label: "Active", value: 1 },
            { label: "Ended", value: 2 },
            { label: "ENDED_TROUBLESHOOT", value: 3 },
            { label: "Paused", value: 5 }
        ];
    }

    initialData() {
        this.Projectservice.getProjectDropdowns()
            .then(res => {
                this.projectlist
                this.projectlist = res
                if (res.length > 0) {
                    this.projectlist.find(z => z.id == "1001")["id"] = ""
                    this.selectedProject = res[0]
                    this.loadRides(this.tableEvent)
                }
            })
    }

    changeProject(e) {
        this.selectedProject= this.projectlist.find(zone => zone.id == e.value)
        setTimeout(() => {
            this.loadRides(this.tableEvent)
        }, 500)
    }
    loadRides(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.get(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                this.selectedProject?.id,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.rides = res.data;
                //console.log(this.rides)
                this.totalRecords = res.totalCount;
                this.activeRidecount = res.activeRidecount;
                this.loading = false;
                this.onToggleEndBtn()
            })
        }, 1000);
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadRides(this.tableEvent);
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    checkLastUpdate(last_update:number,ride_start:string,active:boolean)
    {
        var last_Updated = new Date(last_update*1000)
        var ride_started: Date=new Date(ride_start);
        if(active && Math.round(((new Date()).getTime() - ride_started.getTime())/ 60000)>20)
        {
            // console.log(ride_start)
            // console.log("Is Active",active,' -- ',Math.round(((new Date()).getTime() - ride_started.getTime())/ 60000))
            if(Math.round((Math.abs((new Date().getTime()- last_Updated.getTime())))/ 60000)>20)
            {
                // console.log(Math.round((Math.abs((new Date().getTime()- last_Updated.getTime())))/ 60000))
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        return false;
    }
    endRideAction(id, customerId, position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.disabledrideEndBtn = true;
                this.progressSpinner = true;
                this.rideEnd(id, customerId);

            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            },
            key: "positionDialog"
        });
    }

    rideEnd(id: any, customerId: any) {
        this.endRide = { customerId: customerId, id: id }
        this.service.rideEnd(this.endRide).pipe(first()).subscribe({
            next: (response) => {

                if (response.result) {

                    this.loadRides(this.tableEvent);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ride Ended Successfully', life: 3000 });
                }
                else {
                    this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                }
            },
            error: (error) => {
                this.disabledrideEndBtn = false;
                this.progressSpinner = false;
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
            },
        });
    }

    statusChanged(e) {
        if (e.index == 0)
            this.selectedStatus = e.index + 1;
        if (e.index == 1)
            this.selectedStatus = e.index + 1;
        if (e.index == 2)
            this.selectedStatus = e.index + 1;
        if (e.index == 3)
            this.selectedStatus = e.index + 2;
        this.loadRides(this.tableEvent);
    }

    resetDataTable(dt) {
        localStorage.removeItem("ridesListDAO-local");
        dt.reset();
        this.searchValue = null;
        this.router.navigate(["/rides/ride-main"]);
        this.filterGlobalValue = null;
    }

    onToggleEndBtn() {
        this.showEndBtn = !!this.selectedRides.length && this.selectedRides.every(ride => [1, 5].indexOf(ride.rideStatus.number) >= 0)
    }

    onRidesEndRecentLoc() {
        this.loading = true
        const vehicles = this.selectedRides.map(ride => ride.vehicle.number.toString())
        if (vehicles.length < 1) {
            return
        }
        this.service.ridesEndRecentLoc(vehicles)
            .subscribe({
                next: (response) => {
                    if (response.hasOwnProperty("data")) {
                        if (!response.status) {
                            this.confirmationService.confirm({
                                message: `[${response.data.map(d => d.number.toString()).join(", ")}] <br/> Above scooters are out of zone do you wish to end them?`,
                                header: "Out of zone end confirmation",
                                icon: "pi pi-info-circle",
                                accept: () => this.onEndOutOfZoneRides(vehicles, true),
                                reject: () => this.onEndOutOfZoneRides(vehicles),
                                key: "positionDialog"
                            });
                        } else {
                            this.onEndOutOfZoneRides(vehicles)
                        }
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            })
    }

    onEndOutOfZoneRides(vehicles: string[], confirm: boolean = false) {
        this.service.vehiclesOutOfZoneRidesEnd(vehicles, confirm)
            .subscribe({
                next: (response) => {
                    if (response.status) {
                        this.resetSelection()
                        this.loadRides(this.tableEvent)
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                }, error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            }).add(() => {
                this.loading = false
            });
    }

    resetSelection() {
        this.selectedRides = []
        if (localStorage.hasOwnProperty("ridesListDAO-local")) {
            const obj = JSON.parse(localStorage.getItem("ridesListDAO-local"))
            obj.selection = []
            localStorage.setItem("ridesListDAO-local", JSON.stringify(obj))
        }
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        }
        this.loadRides(this.tableEvent)
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }
    
}
