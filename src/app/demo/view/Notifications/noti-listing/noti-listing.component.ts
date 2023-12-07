import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { NotificationMainComponent } from '../noti-main/noti-main.component';
import { Subject } from 'rxjs';
import { NotificationDao } from 'src/app/demo/domain/Dao/Notification/NotificationDao';
import { NotificationService } from 'src/app/demo/service/notification.service';
@Component({
    selector: 'app-noti-listing',
    templateUrl: './noti-listing.component.html',
    styleUrls: ['./noti-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class NotificationListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    notifications: NotificationDao[]
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any;
    filterGlobalValue: any;
    filterVal: string = ""

    constructor(public main: NotificationMainComponent, private service: NotificationService, private loaderService: LoaderService) {
        localStorage.removeItem("notificationsListDAO-local");
    }

    ngOnInit(): void { }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadNotifications(this.tableEvent);
        }
    }

    loadNotifications(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getAllNotifications(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder).then(resp => {
                    this.notifications = resp.activityLogs.data
                    this.totalRecords = resp.activityLogs.totalCount
                    this.loading = false;
                })
        }, 1000);
    }

    resetDataTable(dt) {
        dt.reset();
        this.filterVal = ''
    }
}


