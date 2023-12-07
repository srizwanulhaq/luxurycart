import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { City } from 'src/app/demo/domain/Dao/Cities/City';
import { CityService } from 'src/app/demo/service/cityservice';
import { CityMainComponent } from '../city-main/city-main.component';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.scss'],
    providers: [MessageService],
})
export class CityListComponent implements OnInit {
    loading: boolean = false;
    event_status: any;
    cities: City[];
    totalRecords: number;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""

    constructor(private service: CityService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public main: CityMainComponent,) {
        localStorage.removeItem("cityList-local");
    }

    ngOnInit(): void {
    }

    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    loadCities(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getCity(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.cities = res.results;
                this.totalRecords = res.rowCount;
                this.loading = false;
            })
        }, 1000);
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadCities(this.tableEvent);
        }
    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("cityList-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/city/city-main"]);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadCities(this.tableEvent)
    }

}
