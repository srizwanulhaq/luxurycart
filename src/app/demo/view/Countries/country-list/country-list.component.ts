import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryDao } from 'src/app/demo/domain/Dao/Countries/CountryDao';
import { CountryService } from 'src/app/demo/service/countryservice';
import { CountryMainComponent } from '../country-main/country-main.component';

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    providers: [MessageService],
})
export class CountryListComponent implements OnInit {

    event_status: any;
    countries: CountryDao[];
    totalRecords: number;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""
    loading: boolean = false;
    constructor(private service: CountryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public main: CountryMainComponent,) {
        localStorage.removeItem("countryList-local");
    }

    ngOnInit(): void {
    }

    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    loadCountries(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getCountry(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.countries = res.results;
                this.totalRecords = res.rowCount;
                this.loading = false;
            })
        }, 1000);
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadCountries(this.tableEvent);
        }

    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("countryList-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/country/country-main"]);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadCountries(this.tableEvent)
    }
}
