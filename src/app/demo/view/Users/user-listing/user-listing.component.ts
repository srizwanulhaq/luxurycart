import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersDao } from 'src/app/demo/domain/Dao/User/UsersDao';
import { UserService } from 'src/app/demo/service/user.service';
import { UserMainComponent } from '../user-main/user-main.component';

@Component({
    selector: 'app-user-listing',
    templateUrl: './user-listing.component.html',
    styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

    users: UsersDao[];
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    searchValue: any;
    event_status: any;
    currentUserName: string;
    startDate: string = ""
    endDate: string = ""

    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    filterGlobalValue: any;

    constructor(public main: UserMainComponent, private service: UserService, private cdref: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
            localStorage.removeItem("lstUsers-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.currentUserName = parameter;
                this.filterGlobalValue = parameter;
            }
        });
    }

    ngOnInit(): void { }

    loadUsers(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        if (this.currentUserName != null) {
                this.service.getAllChildUsers(event.first / event.rows + 1,
                    event.rows,
                    event.globalFilter ?? this.searchValue,
                    event.sortField,
                    event.sortOrder,
                    !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").then(res => {
                        this.users = res.results;
                        this.totalRecords = res.rowCount;
                        this.loading = false;
                    })
        }
        else {
           
                this.service.getAllUsers(event.first / event.rows + 1,
                    event.rows,
                    event.globalFilter ?? this.searchValue,
                    event.sortField,
                    event.sortOrder,
                    !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").then(res => {
                        this.users = res.results;
                        this.totalRecords = res.rowCount;
                        this.loading = false;
                    })
        }


    }
    resetDataTable(dt) {
        localStorage.removeItem("lstUsers-local");
        dt.reset();
        this.searchValue = null;
        this.filterGlobalValue = null;
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadUsers(this.tableEvent);
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadUsers(this.tableEvent)
    }
}
