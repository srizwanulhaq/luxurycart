import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { CustomerTransactionList } from 'src/app/demo/domain/Dao/Customers/CustomerTransactionList';
import { CustomerService } from 'src/app/demo/service/customer.service';


@Component({
  selector: 'app-customer-transaction-list',
  templateUrl: './customer-transaction-list.component.html',
  styleUrls: ['./customer-transaction-list.component.scss']
})
export class CustomerTransactionListComponent implements OnInit {

  private _details:AdminCustomerListDAO;
  transaction: CustomerTransactionList[];
  totalRecords:number;
  loading:boolean;
  event_status:any;
  total_debit:number;
  total_credit:number;
    
  constructor(private _customersService: CustomerService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: AdminCustomerListDAO) {
    if (value) {
      this._details = value;
      this.loadCustomerTransactionList(this.event_status)
    }
  }

  get details(): AdminCustomerListDAO {
    return this._details;
  }
  loadCustomerTransactionList(event: LazyLoadEvent) {
    this.event_status = event;
    this.loading = true;
    setTimeout(() => {
      this._customersService
      .getCustomerTransactionlist(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter, 
        event.sortField, 
        event.sortOrder,
        this.details.id
        )
        .subscribe(response => {
        this.transaction = response.transactiondto.data;
        this.totalRecords = response.transactiondto.totalCount;
        this.total_credit = response.transactiondto.total_Credit;
        this.total_debit = response.transactiondto.total_Debit;
        if (this.transaction) {
          this.loading = false;
        }
      });
    }, 1000);
  }



}
