import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { ActivityLoggingDao } from 'src/app/demo/domain/Dao/ActivityLoggings/ActivityLoggingDao';
import { ActivityLoggingService } from 'src/app/demo/service/activityLoggingService';
import { ActivityLoggingMainComponent } from '../activityl-main/activityl-main.component';

@Component({
    selector: 'app-activityl-listing',
    templateUrl: './activityl-listing.component.html',
    styleUrls: ['./activityl-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})

export class ActivityLoggingListingComponent implements OnInit {
    filterVal: string = ''
    activityLoggings: ActivityLoggingDao[];
    activityLoggingData: ActivityLoggingDao;
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    selectedStatus: number = 1;
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    position: string;
    disabledCategoryEndBtn: boolean = false;
    progressSpinner: boolean = false;

    constructor(public main: ActivityLoggingMainComponent,
        private activityService: ActivityLoggingService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cdref: ChangeDetectorRef) { 
            localStorage.removeItem("activityList-local");
        }

    ngOnInit(): void {
        this.cols = [
            { field: "date", subfield: "date", header: "Date" },
            { field: "title", subfield: "title", header: "Title" },
            { field: "message", subfield: "message", header: "Message" },
            { field: "route", subfield: "route", header: "Route" },
            { field: "Action", header: "Action" },
        ];
    }

    loadActivityLoggings(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.activityService.getActivityLoggings(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter,
                event.sortField,
                event.sortOrder
            ).then(activityL => {
                this.activityLoggings = activityL.activitydao.data;
                this.totalRecords = activityL.activitydao.totalCount;
                this.loading = false;
            })
        }, 1000);
    }

    markAsRead(activityId = "") {
        let msg = 'Are you sure you want to mark all activities as read'
        if (activityId) {
            const temp = this.activityLoggings.find(al => al.id == activityId)
            msg = `Are you sure you want to mark this activity ${temp.title} as read`
        }
        this.confirmationService.confirm({
            message: msg,
            header: "Mark As Read",
            icon: "pi pi-info-circle",
            accept: () => {
                this.activityService.markAsRead(activityId)
                    .pipe(first())
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({ severity: response.status, summary: "Successful", detail: response.message, life: 3000 });
                            if (activityId) {
                                this.activityLoggings.find(al => al.id == activityId).read = true
                            } else {
                                this.activityLoggings.forEach(al => { al.read = true })
                            }
                        },
                        error: (error) => {
                            this.messageService.add({ severity: "error", summary: "Failed", detail: error, life: 3000 });
                        },
                    });
            },
            reject: () => {
                this.messageService.add({ severity: "warning", summary: "Failed", detail: "You have rejected", life: 3000 });
            }
        });
    }

    resetDataTable(dt) {
        dt.reset();
        this.filterVal = ''
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadActivityLoggings(this.tableEvent);
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

}


