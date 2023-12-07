import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transactiondao } from 'src/app/demo/domain/Dao/Transaction/transactiondao';
import { TransactionDetailsDto } from 'src/app/demo/domain/Dto/Transactions/TransactionDetailsDto';
import { TransactionService } from 'src/app/demo/service/transaction.service';
import { TransactionMainComponent } from '../transaction-main/transaction-main.component';
 
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  private _details:Transactiondao;
  transDetails:TransactionDetailsDto;
  countryCurrency:string;

  
  constructor(public main: TransactionMainComponent,private transactionService: TransactionService,
    ) { }
  
  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input() 
  set details(value: Transactiondao) {
    if (value) {
      this._details = value;
      this.getTransactionDetailsById(value.customers.id,value.id);
    }
  }

  get details(): Transactiondao {
    return this._details;
  }

  getTransactionDetailsById(CustomerId,TransId) {
    this.transactionService.getTransactionDetails(CustomerId,TransId).subscribe(responseList => {
       this.transDetails = responseList.transDetails;
       this.countryCurrency = responseList.countryCurrency;
    });
  }
}
