import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { TourPointSlotService } from 'src/app/demo/service/tour-point-slot.service';
import { TourPointSlotsMainComponent } from '../tour-point-slots-main/tour-point-slots-main.component';
import { Table } from 'primeng/table';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';

@Component({
  selector: 'app-tour-point-slots-list',
  templateUrl: './tour-point-slots-list.component.html',
  styleUrls: ['./tour-point-slots-list.component.scss']
})
export class TourPointSlotsListComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstPointSlots: PointSlotDto[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;

  constructor(private service: TourPointSlotService,
    public main: TourPointSlotsMainComponent,
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPointSlots(this.tableEvent);
    }
  }

  loadPointSlots(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
      this.service.getAllPointSlots(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter ?? this.filterGlobalValue,
        event.sortField,
        event.sortOrder
      ).then(res => {
        this.lstPointSlots = res.results;
        this.totalRecords = res.rowCount;
        this.loading = false;
      })
    }, 1000);
  }
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("pointSlotsListDao-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}

}
