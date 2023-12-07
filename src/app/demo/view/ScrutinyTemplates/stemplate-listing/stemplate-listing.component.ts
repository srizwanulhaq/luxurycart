import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { Subject } from 'rxjs';
import { RideScrutinyTemplateDao } from 'src/app/demo/domain/Dao/RideScrutinyTemplate/ScrutinyTemplateDao';
import { RideScrutinyTemplateService } from 'src/app/demo/service/RideScrutinyTemplateService';
import { RideScrutinyTemplateDto } from 'src/app/demo/domain/Dto/RideScrutinyTemplate/ScrutinyTemplateDto';

@Component({
    selector: 'app-stemplate-listing',
    templateUrl: './stemplate-listing.component.html',
    styleUrls: ['./stemplate-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ScrutinyTemplateListingComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    rideScrutinyTemplates: RideScrutinyTemplateDao[]
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    @ViewChild(Table, { static: false }) tableEvent;
    progressSpinner: boolean = false;
    searchValue: any;
    filterGlobalValue: any;
    @Output() formCall = new EventEmitter<RideScrutinyTemplateDto>();
    startDate: string = ""
    endDate: string = ""

    constructor(private service: RideScrutinyTemplateService, private messageService: MessageService, private loaderService: LoaderService) {
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
            this.service.getRideScrutinyTemplates(event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.searchValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(resp => {
                if (resp.status) {
                    this.rideScrutinyTemplates = resp.data.ride_scrutiny_templates
                    this.totalRecords = resp.data.total_count
                }
                this.loading = false;
            })
        }, 1000);
    }

    toggleItem(id: number) {
        this.loading = true;
        setTimeout(() => {
            this.service.toggleRideScrutinyTemplate(id)
                .then(resp => {
                    if (resp.status) {
                        const temp = this.rideScrutinyTemplates.find(template => template.id == id)
                        temp.active = !temp.active
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: resp.message, life: 3000 });
                    }
                }).catch((e: any) => {
                }).finally(() => {
                    this.loading = false;
                })
        }, 1000)
    }

    formData(id?: number) {
        let template = undefined
        if (!!id) {
            template = this.rideScrutinyTemplates.find(rst => rst.id == id)
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
}
