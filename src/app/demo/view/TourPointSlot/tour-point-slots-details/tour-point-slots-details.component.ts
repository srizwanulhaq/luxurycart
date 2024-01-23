import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';
import { TourPointSlotsMainComponent } from '../tour-point-slots-main/tour-point-slots-main.component';

@Component({
  selector: 'app-tour-point-slots-details',
  templateUrl: './tour-point-slots-details.component.html',
  styleUrls: ['./tour-point-slots-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class TourPointSlotsDetailsComponent implements OnInit {

  private _details:PointSlotDto;

  constructor(public main: TourPointSlotsMainComponent ) { }

  ngOnInit(): void {
    
  }
  
  @Input()
  set details(value: PointSlotDto) {
      if (value) {
          this._details = value;
      }

  }

  get details(): PointSlotDto {
      return this._details;
  }
}
