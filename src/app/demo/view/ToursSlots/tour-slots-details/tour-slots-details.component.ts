import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TourSlotsMainComponent } from '../tour-slots-main/tour-slots-main.component';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';

@Component({
  selector: 'app-tour-slots-details',
  templateUrl: './tour-slots-details.component.html',
  styleUrls: ['./tour-slots-details.component.scss']
})
export class TourSlotsDetailsComponent implements OnInit {
  private _details: PointSlotDto;
  constructor(public main: TourSlotsMainComponent) { }
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

}
