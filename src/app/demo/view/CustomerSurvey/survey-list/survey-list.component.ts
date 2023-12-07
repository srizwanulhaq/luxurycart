import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerSurveyDao } from 'src/app/demo/domain/Dao/CustomerSurvey/CustomerSurveyDao';
import { CustomerSurveyService } from 'src/app/demo/service/customer-survey.service';

@Component({
    selector: 'app-survey-list',
    templateUrl: './survey-list.component.html',
    styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

    constructor(private service: CustomerSurveyService) { 
        localStorage.removeItem("survey-local");
    }
    ngOnInit(): void {
    }

    customerSurveys: CustomerSurveyDao[]
    selectedCustomerSurveys: CustomerSurveyDao[] = []
    @Output() toggleCustomerSurvey = new EventEmitter<CustomerSurveyDao>();
    @ViewChild(Table, { static: false }) tableEvent;
    startDate: string = ""
    endDate: string = ""
    totalRecords: number;
    loading: boolean = false;
    rowsPerPageOptions = [10, 25, 50];
    filterBy: string = ""
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadCustomerSurveys(this.tableEvent);
        }
    }

    loadCustomerSurveys(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getSurveys(
                event.first / event.rows + 1,
                event.rows,
                this.filterBy,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(cSResp => {
                this.customerSurveys = cSResp.list;
                this.totalRecords = cSResp.total_count;
                this.loading = false;
            })
        }, 1000);
    }
    onSearch() {
        if (!!this.filterBy.trim()) {
            this.loadCustomerSurveys(this.tableEvent)
        }
    }

    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("survey-local");
        this.filterBy = "";
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadCustomerSurveys(this.tableEvent)
    }

    onToggleCustomerSurvey(survey: CustomerSurveyDao) {
        this.toggleCustomerSurvey.emit(survey)
    }
}
