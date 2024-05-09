import { Component, OnInit } from '@angular/core';
import { TicketType } from 'src/app/demo/domain/Dao/TicketType/ticket-type.model';

@Component({
  selector: 'app-ticket-type-main',
  templateUrl: './ticket-type-main.component.html',
  styleUrls: ['./ticket-type-main.component.scss']
})
export class TicketTypeMainComponent implements OnInit {
  event: Event;
  _type:TicketType;
  editPanelClick: boolean;
  editPanelActive: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }

  onEditPanelButtonClick(event, type: TicketType){

    this._type = type;
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
}
