import { Component, OnInit } from '@angular/core';
import { BoothDto } from 'src/app/demo/domain/Dto/Booth/BoothDto';

@Component({
  selector: 'app-booth-main',
  templateUrl: './booth-main.component.html',
  styleUrls: ['./booth-main.component.scss']
})
export class BoothMainComponent implements OnInit {

  event: Event;
  booth:BoothDto;
  editPanelClick: boolean;
  editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditBoothData: BoothDto){

    this.booth = EditBoothData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
  onBottomPanelButtonClick(event,booth:BoothDto){
    this.booth = booth;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
