import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { UserTrackMainComponent } from '../usert-main/usert-main.component';
import { Subject } from 'rxjs';
import { UserTrackDao, UserTrackDetailDao } from 'src/app/demo/domain/Dao/User/UserTrackingDao';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    selector: 'app-usert-listing',
    templateUrl: './usert-listing.component.html',
    styleUrls: ['./usert-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class UserTrackListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    userTracks: UserTrackDao[]
    cols: any[];
    selectedLogStatus: string = ""
    isWithinZone: string = ""
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any;
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""

    constructor(public main: UserTrackMainComponent, private service: UserService,
         private loaderService: LoaderService,
         private cdref: ChangeDetectorRef) {
        localStorage.removeItem("userTrackListDao-local");

    }

    ngOnInit(): void { }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadUserTracks(this.tableEvent);
        }
    }

    @Output() onDetailClick = new EventEmitter<string>()
    @Output() onMapBtnClick = new EventEmitter<boolean>()

    loadUserTracks(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getAllUserTrackResp(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                this.selectedLogStatus,
                this.isWithinZone,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(resp => {
                this.userTracks = resp.result
                this.totalRecords = resp.totalCount
                this.loading = false;
            })
        }, 1000);
    }

    getDetails(userId: string) {
        this.onDetailClick.emit(userId);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadUserTracks(this.tableEvent)
    }

    onMapOpen() {
        this.onMapBtnClick.emit(true)
    }

    resetDataTable(dt) {
        localStorage.removeItem("userTrackListDao-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.filterGlobalValue = null;
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}


