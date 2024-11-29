import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BoothTicketdao } from 'src/app/demo/domain/Dao/BoothTicket/BoothTicketdao';
@Component({
  selector: 'app-booth-ticket-purchase-main',
  templateUrl: './booth-ticket-purchase-main.component.html',
  styleUrls: ['./booth-ticket-purchase-main.component.scss'],
  providers: [MessageService,ConfirmationService],
})
export class BoothTicketPurchaseMainComponent implements OnInit {

  boothTicket: BoothTicketdao;
  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  event: Event;

  constructor() { }


  ngOnInit(): void {
  }



  onBottomPanelButtonClick(event, boothTicket) {
    this.boothTicket = boothTicket;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onBottomPanelClick() {
    this.bottomPanelClick = true;
  }

  onChange(event){
    this.event = event;
  }
}

