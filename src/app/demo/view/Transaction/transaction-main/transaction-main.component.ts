import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Transactiondao } from 'src/app/demo/domain/Dao/Transaction/transactiondao';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction-main.component.html',
  styleUrls: ['./transaction-main.component.scss'],
  providers: [MessageService,ConfirmationService],
})
export class TransactionMainComponent implements OnInit {

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
