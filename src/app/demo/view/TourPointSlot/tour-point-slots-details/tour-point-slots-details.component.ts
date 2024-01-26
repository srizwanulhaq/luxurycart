import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';
import { TourPointSlotsMainComponent } from '../tour-point-slots-main/tour-point-slots-main.component';
import { first } from 'rxjs/operators';
import { TourPointSlotService } from 'src/app/demo/service/tour-point-slot.service';

@Component({
  selector: 'app-tour-point-slots-details',
  templateUrl: './tour-point-slots-details.component.html',
  styleUrls: ['./tour-point-slots-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class TourPointSlotsDetailsComponent implements OnInit {

  private _details:PointSlotDto;

  constructor(public main: TourPointSlotsMainComponent ,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private service: TourPointSlotService,) { }

  ngOnInit(): void {
    
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
