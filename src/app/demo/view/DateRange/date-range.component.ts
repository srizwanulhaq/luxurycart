import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'shared-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
    providers: [DatePipe]
})
export class DateRangeComponent implements OnInit {
    @Input("loading") loading: boolean;
    @Output("onDateChange") dateChange = new EventEmitter<{ type: string, date: string }>();
    @Output("onRangeChange") rangeChange = new EventEmitter<boolean>();
    public _startDate: Date
    public _endDate: Date
    @Input()
    get startDate(): Date {
        return this._startDate
    }
    set startDate(value: any) {
        this._startDate = !!value ? new Date(value) : undefined
    }
    @Input()
    get endDate(): Date {
        return this._endDate
    }
    set endDate(value: any) {
        this._endDate = !!value ? new Date(value) : undefined
    }

    constructor(private datepipe: DatePipe) {
    }
    ngOnInit(): void { }

    onDateSelect(date: Date, type: string) {
        if(type == 'end'){
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59);
            this.dateChange.emit({
                date: this.datepipe.transform(endDate, "yyyy-MM-dd HH:mm:00"),
                type
            });
        }
        else{
            this.dateChange.emit({
                date: this.datepipe.transform(date, "yyyy-MM-dd HH:mm:00"),
                type
            });
        }

        if (!!this.startDate && (!!this.endDate || type == "end" && date)) {
            this.rangeChange.emit(false);
        }
    }

    onResetRange() {
        this.rangeChange.emit(true);
    }
}

