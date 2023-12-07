import { Component, OnInit } from '@angular/core';
import { VisitPlaceDto } from 'src/app/demo/domain/Dto/VisitPlaces/VisitPlaceDto';

@Component({
  selector: 'app-visit-place-main',
  templateUrl: './visit-place-main.component.html',
  styleUrls: ['./visit-place-main.component.scss']
})
export class VisitPlaceMainComponent implements OnInit {
  event: Event;
  bottomPanelActive:boolean;
  editPanelActive:boolean;
  place:VisitPlaceDto;
  editPlace:VisitPlaceDto;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }
  onBottomPanelButtonClick(event,place:VisitPlaceDto){
    this.place = place;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onEditPanelButtonClick(event, editPlaceData: VisitPlaceDto) {
    this.editPlace = editPlaceData;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
}
}
