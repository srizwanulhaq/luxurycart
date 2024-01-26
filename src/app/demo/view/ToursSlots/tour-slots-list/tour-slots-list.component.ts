import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { TourSlots } from 'src/app/demo/domain/Dao/tourSlots/TourSlots';
import { TourService } from 'src/app/demo/service/tour.service';
import { TourSlotsMainComponent } from '../tour-slots-main/tour-slots-main.component';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tour-slots-list',
  templateUrl: './tour-slots-list.component.html',
  styleUrls: ['./tour-slots-list.component.scss'],
  providers:[MessageService,ConfirmationService]
  
})
export class TourSlotsListComponent implements OnInit {
  mainloding: boolean = true;
  event_status: any;
  filterGlobalValue: any;
  tourStatusValue: number = 7;
  startDate: any;
  endDate: any;
  toursSlots: TourSlots[];
  totalRecords: number;
  rowsPerPageOptions = [10, 25, 50];
  cols: any[];
  selectedStatus: number = 7
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadTourSlots(this.tableEvent);
    }
  }

  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;
  constructor(private _tourService: TourService, public main: TourSlotsMainComponent,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) {
      localStorage.removeItem("adac");
      activatedRoute.queryParams.subscribe((params: Params) => {

          const parameter = params['customdata'];
          if (parameter !== undefined) {
              this.filterGlobalValue = parameter.replace(/[+]/g, '');
          }

      });
   }

  ngOnInit() {

  }
  loadTourSlots(event: LazyLoadEvent) {
    this.mainloding = true;
    this.event_status = event;
    setTimeout(() => {
        this._tourService.getTourTimes(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            this.tourStatusValue,
        ).then(res => {
          this.mainloding = false;
            this.toursSlots = res.results;
            this.totalRecords = res.rowCount;
        })
    }, 1000);
}

  onStatus(e, timeSlot) {
  var active = e.checked;
  this.confirmService.confirm({
    message: "Do you want to change status?",
    header: "Change Confirmation",
    icon: "pi pi-info-circle",
    accept: () => {
      //-------------------------------------
      var model = {
        id: timeSlot.id,
        active: active,
      };
      this._tourService
        .changeStatus(model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            this.loadTourSlots(this.tableEvent);
          },
          error: (error) => {
              this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
 
    },
    reject: () => {
      timeSlot.active = !active;
    },
  });
}
}
