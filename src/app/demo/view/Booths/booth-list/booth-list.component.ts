import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoothService } from 'src/app/demo/service/booth.service';
import { BoothMainComponent } from '../booth-main/booth-main.component';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { BoothDto } from 'src/app/demo/domain/Dto/Booth/BoothDto';

@Component({
  selector: 'app-booth-list',
  templateUrl: './booth-list.component.html',
  styleUrls: ['./booth-list.component.scss']
})
export class BoothListComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstBooths: BoothDto[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: BoothService,
    public main: BoothMainComponent,
    private cdref: ChangeDetectorRef) { 
      localStorage.removeItem("boothListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadBooth(this.tableEvent);
    }
  }

  loadBooth(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
        this.service.getAllBooth(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
            this.lstBooths = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("boothListDao-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
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
  } this.loadBooth(this.tableEvent)
}

}
