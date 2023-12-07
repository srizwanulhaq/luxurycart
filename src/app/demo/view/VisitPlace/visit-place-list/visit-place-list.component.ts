import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { VisitPlaceDto } from 'src/app/demo/domain/Dto/VisitPlaces/VisitPlaceDto';
import { VisitPlaceService } from 'src/app/demo/service/visitPlace.service';
import { VisitPlaceMainComponent } from '../visit-place-main/visit-place-main.component';

@Component({
  selector: 'app-visit-place-list',
  templateUrl: './visit-place-list.component.html',
  styleUrls: ['./visit-place-list.component.scss']
})
export class VisitPlaceListComponent implements OnInit {

  event_status:any; 
  rowsPerPageOptions = [10, 25, 50];
  filterGlobalValue: any;
  totalRecords:number;
  _lstVisitPlace:VisitPlaceDto[];
  @ViewChild(Table, { static: false }) tableEvent;

  constructor( private service:VisitPlaceService,public main:VisitPlaceMainComponent) { 
    localStorage.removeItem("visitPlaceListDao-local");
  }

  ngOnInit(): void {
  }
  @Input()
  set event(event: Event) {
      if (event) {
          this.loadVisitPlace(this.tableEvent);
      }
  }
  loadVisitPlace(event: LazyLoadEvent) {
    this.event_status = event;

    setTimeout(() => {
        this.service.getAllVisitPlace(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder
        ).then(res => {
            this._lstVisitPlace = res.results;
            this.totalRecords = res.rowCount;
        })
    }, 1000);
}
resetDataTable(dt) {
  dt.reset();
  localStorage.removeItem("visitPlaceListDao-local");
  this.event_status.globalFilter = "";
  this.filterGlobalValue = null;
}
}
