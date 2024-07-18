import { Component, OnInit } from '@angular/core';
import { EventTicketType } from 'src/app/demo/domain/Dao/Event-Ticket-Type/event-ticket-type-dao';

@Component({
  selector: 'app-event-ticket-type-main',
  templateUrl: './event-ticket-type-main.component.html',
  styleUrls: ['./event-ticket-type-main.component.scss']
})
export class EventTicketTypeMainComponent implements OnInit {

  event: Event;
  ticket_type:EventTicketType;
  editPanelClick: boolean;
  editPanelActive: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditTicketTypeData: EventTicketType){

    this.ticket_type = EditTicketTypeData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
}
