import { Component, OnInit } from '@angular/core';
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
  // onEditPanelButtonClick(event, EditBoothData: BoothDto){

  //   this.booth = EditBoothData
  //   this.editPanelClick = true;
  //   this.editPanelActive = !this.editPanelActive;
  //   event.preventDefault();
  //   this.event = null;
  //  }
}
