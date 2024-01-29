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

  
  editPanelClick: boolean;
  editPanelActive: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditPointData: PointSlotDto){
    this.pointSlot = EditPointData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }

  onBottomPanelButtonClick(event,pointSlot:PointSlotDto){
    this.pointSlot = pointSlot;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
