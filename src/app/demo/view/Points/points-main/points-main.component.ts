import { Component, OnInit } from '@angular/core';
import { Points } from 'src/app/demo/domain/Dao/Tours/points';

@Component({
  selector: 'app-points-main',
  templateUrl: './points-main.component.html',
  styleUrls: ['./points-main.component.scss']
})
export class PointsMainComponent implements OnInit {

  event: Event;
  point:Points;
  editPanelClick: boolean;
  editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditPointData: Points){

    this.point = EditPointData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
  onBottomPanelButtonClick(event,point:Points){
    this.point = point;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
}
