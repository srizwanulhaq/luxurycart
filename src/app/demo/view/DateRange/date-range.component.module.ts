import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DateRangeComponent } from './date-range.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [DateRangeComponent],
    imports: [
        CommonModule,
        CalendarModule,
        FormsModule
    ],
    exports: [DateRangeComponent]
})
export class DateRangeComponentModule { }
