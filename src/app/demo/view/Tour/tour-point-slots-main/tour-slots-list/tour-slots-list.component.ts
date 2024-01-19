import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { TourSlots } from 'src/app/demo/domain/Dao/Vehicle/TourSlots';
import { TourService } from 'src/app/demo/service/tour.service';

@Component({
  selector: 'app-tour-slots-list',
  templateUrl: './tour-slots-list.component.html',
  styleUrls: ['./tour-slots-list.component.scss']
})
export class TourSlotsListComponent implements OnInit {
  event_status: any;
  filterGlobalValue: any;
  tourStatusValue: number = 1;
  startDate: any;
  endDate: any;
  toursSlots: TourSlots[];
  totalRecords: number;
  rowsPerPageOptions = [10, 25, 50];
  cols: any[];
  constructor(private _tourService: TourService) { }

  ngOnInit() {
  }
  loadTourSlots(event: LazyLoadEvent) {
    this.event_status = event;
    setTimeout(() => {
      this._tourService.getTourTimes(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter ?? this.filterGlobalValue,
        event.sortField,
        event.sortOrder,
        this.tourStatusValue,
        !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
      ).then(res => {
        this.toursSlots = res.results;
        //console.log(this.toursSlots)
        this.totalRecords = res.rowCount;
        if (this.toursSlots) {
          for (var i = 0; i < this.toursSlots.length; i++) {
            this.toursSlots[i].time_Status = new Date(this.toursSlots[i].lastUpdatedTime * 1000);
          }
        }
      })
    }, 1000);

  }
}
