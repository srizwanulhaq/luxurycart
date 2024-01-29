import { Component, OnInit } from '@angular/core';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';
import { EditTourDto } from 'src/app/demo/domain/Dto/TourSlots/EditTourDto';

@Component({
  selector: 'app-tour-slots-main',
  templateUrl: './tour-slots-main.component.html',
  styleUrls: ['./tour-slots-main.component.scss']
})
export class TourSlotsMainComponent implements OnInit {
  event: Event;
  editTourData: EditTourDto;
  editPanelActive: boolean;
  editPanelClick: boolean;
  bottomPanelActive:boolean;
  slots:PointSlotDto;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    this.event = event;
  }
  onEditPanelButtonClick(event, editTourData: EditTourDto) {
    console.log(editTourData)
    this.editTourData = editTourData;
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
  }
  onBottomPanelButtonClick(event,slots:PointSlotDto){
    this.slots = slots;
    console.log(this.slots);
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
}
