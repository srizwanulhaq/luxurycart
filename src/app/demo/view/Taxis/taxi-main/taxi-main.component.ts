import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Transactiondao } from 'src/app/demo/domain/Dao/Transaction/transactiondao';
@Component({
  selector: 'app-taxi-main',
  templateUrl: './taxi-main.component.html',
  styleUrls: ['./taxi-main.component.scss'],
  providers: [MessageService,ConfirmationService],
})
export class TaxiMainComponent implements OnInit {

  Transaction: Transactiondao;
  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  onBottomPanelButtonClick(event, Transaction) {
    this.Transaction = Transaction;
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

