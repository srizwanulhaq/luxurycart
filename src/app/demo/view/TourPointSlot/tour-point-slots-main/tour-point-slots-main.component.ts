import { Component, OnInit } from '@angular/core';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';

@Component({
  selector: 'app-tour-point-slots-main',
  templateUrl: './tour-point-slots-main.component.html',
  styleUrls: ['./tour-point-slots-main.component.scss']
})
export class TourPointSlotsMainComponent implements OnInit {

  event: Event;
  bottomPanelActive:boolean;
  pointSlot:PointSlotDto;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }


  onBottomPanelButtonClick(event,pointSlot:PointSlotDto){
    this.pointSlot = pointSlot;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
