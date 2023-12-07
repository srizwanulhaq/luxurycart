import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ReportProblemDao } from 'src/app/demo/domain/Dao/ReportProblems/ReportProblemDao';
import { ReportProblemService } from 'src/app/demo/service/reportProblemService';
import { ReportProblemMainComponent } from '../reportp-main/reportp-main.component';

@Component({
    selector: 'app-reportp-listing',
    templateUrl: './reportp-listing.component.html',
    styleUrls: ['./reportp-listing.component.scss'],
})

export class ReportProblemListingComponent implements OnInit {
    filterGlobalValue: any;
    reportProblems: ReportProblemDao[];
    reportProblemData: ReportProblemDao;
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
    startDate: string = ""
    endDate: string = ""

    constructor(public main: ReportProblemMainComponent, private service: ReportProblemService,
        private cdref: ChangeDetectorRef) {
            localStorage.removeItem("reportProblem-local");
         }

    ngOnInit(): void {
        this.cols = [
            { field: "date", subfield: "date", header: "Date" },
            { field: "customer", subfield: "customer", header: "Customer" },
            { field: "problem_Desc", subfield: "problem_Desc", header: "Description" },
            { field: "brand", subfield: "brand", header: "Brand" },
            { field: "model_Number", subfield: "model_Number", header: "Model Number" },
            { field: "oS_Version", subfield: "oS_Version", header: "OS Version" },
            { field: "image", subfield: "image", header: "Image" },
            { field: "Action", header: "Action" },
        ];
    }

    loadReportProblems(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.service.getReportProblems(
                event.first / event.rows + 1,
                event.rows,
                this.filterGlobalValue ?? event.globalFilter,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(reportP => {
                this.reportProblems = reportP.reportproblemsto.data;
                this.totalRecords = reportP.reportproblemsto.totalCount;
                this.loading = false;
            })
        }, 1000);
    }

    resetDataTable(dt) {
        localStorage.removeItem("reportProblem-local");
        dt.reset();
        this.filterGlobalValue = null;

    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadReportProblems(this.tableEvent);
        }
    }
    @Input()
    set last_id(val: string) {
        if (!!val) {
            this.filterGlobalValue = val
            this.loadReportProblems(this.tableEvent)
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
        } this.loadReportProblems(this.tableEvent)
    }
}


