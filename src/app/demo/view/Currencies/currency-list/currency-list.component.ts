import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Currency } from 'src/app/demo/domain/Dao/Currencies/Currency';
import { CurrencyService } from 'src/app/demo/service/currencyservice';
import { CurrencyMainComponent } from '../currency-main/currency-main.component';

@Component({
    selector: 'app-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: ['./currency-list.component.scss'],
    providers: [MessageService],
})
export class CurrencyListComponent implements OnInit {
    loading: boolean = false;
    event_status: any;
    currencies: Currency[];
    totalRecords: number;
    rowsPerPageOptions = [10, 25, 50];
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = ""

    constructor(private service: CurrencyService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public main: CurrencyMainComponent,) {
        localStorage.removeItem("currencyList-local");
    }

    ngOnInit(): void {
    }
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    loadCurrencies(event: LazyLoadEvent) {
        this.loading = true;
        this.event_status = event;
        setTimeout(() => {
            this.service.getCurrency(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then(res => {
                this.currencies = res.results;
                this.totalRecords = res.rowCount;
                this.loading = false;
            })
        }, 1000);
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadCurrencies(this.tableEvent);
        }
    }
    resetDataTable(dt) {
        dt.reset();
        localStorage.removeItem("currencyList-local");
        this.event_status.globalFilter = "";
        this.filterGlobalValue = null;
        this.router.navigate(["/currency/currency-main"]);
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        } this.loadCurrencies(this.tableEvent)
    }
}
