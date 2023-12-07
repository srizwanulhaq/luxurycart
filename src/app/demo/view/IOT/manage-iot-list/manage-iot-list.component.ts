import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IotDAO, IotDtoes, IotListDAO } from 'src/app/demo/domain/Dao/IOT/IOTdao';
import { ManageIotService } from 'src/app/demo/service/manage-iot.service';
import { ManageIotMainComponent } from '../manage-iot-main/manage-iot-main.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
    selector: 'app-manage-iot-list',
    templateUrl: './manage-iot-list.component.html',
    styleUrls: ['./manage-iot-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ManageIotListComponent implements OnInit {

    btnloading: boolean = false;
    totalRecords: number;
    pageSize: number = 10;
    progressSpinner: boolean = false;
    event_status: any;
    dt_status: any;
    loading: boolean = true;
    iotListDAO: IotListDAO[];
    _iotDAO: IotDAO;
    iotDtoes: IotDtoes; //Append form value
    _itemSubaccount = [];
    _itemIotModel = [];
    _itemSubaccountVal: number;
    _itemIotModelVal: string;
    itemsManageIotStatus: any[];
    iotStatusValue: number = 1;
    searchValue: any;
    @ViewChild(Table, { static: false }) tableEvent;
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""

    constructor(private _manageIotService: ManageIotService,
        public main: ManageIotMainComponent,
        private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        localStorage.removeItem("iotListDAO-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter
            }

        });
    }

    @Output() eventChange = new EventEmitter<Event>();

    ngOnInit(): void {
        this.itemsManageIotStatus = [
            { label: 'All', value: 1 },
            { label: 'Only used', value: 2 },
            { label: 'Not used', value: 3 },
            { label: 'Inactive for > 1 day', value: 4 },
            { label: 'Inactive for > 7 days', value: 5 }
        ];
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadloadManageIotLazy(this.event_status);
        }
    }
    loadloadManageIotLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
            setTimeout(() => {
                this._manageIotService
                    .getAllManageIotParams((
                        event.first / event.rows) + 1,
                        event.rows,
                        event.globalFilter ?? this.filterGlobalValue,
                        event.sortField,
                        event.sortOrder,
                        this.iotStatusValue,
                        !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
                    )
                    .subscribe(response => {
                        this.iotListDAO = response.manageiot.results;
                        this.totalRecords = response.manageiot.rowCount;
                        this.loading = false;
                       
                    });
                    
            }, 1000);
        
    }

    resetDataTable(dt) {
        localStorage.removeItem("iotListDAO-local");
        dt.reset(); // reset the table
        this.event_status.globalFilter = "";
        this.router.navigate(["/iot/manage-iot-main"]);
        this.filterGlobalValue = null;
    }

    statusChanged(e) {
        this.iotStatusValue = e.index + 1;
        this.loadloadManageIotLazy(this.tableEvent);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadloadManageIotLazy(this.tableEvent)
    }
}
