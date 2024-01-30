import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TourSlotsMainComponent } from '../tour-slots-main/tour-slots-main.component';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TourPointSlotService } from 'src/app/demo/service/tour-point-slot.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tour-slots-details',
  templateUrl: './tour-slots-details.component.html',
  styleUrls: ['./tour-slots-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class TourSlotsDetailsComponent implements OnInit {
  private _details: PointSlotDto;
  constructor(public main: TourSlotsMainComponent,private confirmService: ConfirmationService,private service: TourPointSlotService,private messageService: MessageService,) { }
  ngOnInit() {
    console.log(this._details, 'details');
  }
  @Output() eventChange = new EventEmitter<Event>();

  @Input()
  set details(value: PointSlotDto) {
    if (value) {
      this._details = value;
    }
  }

  get details(): PointSlotDto {
    return this._details;
  }
  onStatus(e, id) {
    var active = e.checked;
    this.confirmService.confirm({
      message: "Do you want to change status?",
      header: "Change Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        //-------------------------------------
        var model = {
          id: id,
          active: active,
        };
        this.service
          .changeStatus(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
            },
            error: (error) => {
                this.main.bottomPanelActive = true;
                this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
   
      },
      reject: () => {
        this.details.active = !active;
      },
    });
  }
}
