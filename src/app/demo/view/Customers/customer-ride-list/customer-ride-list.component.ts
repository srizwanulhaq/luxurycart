import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { CustomerRideList } from 'src/app/demo/domain/Dao/Customers/CustomerRideList';
import { CustomerService } from 'src/app/demo/service/customer.service';


@Component({
  selector: 'app-customer-ride-list',
  templateUrl: './customer-ride-list.component.html',
  styleUrls: ['./customer-ride-list.component.scss']
})
export class CustomerRideListComponent implements OnInit {

  private _details:AdminCustomerListDAO;
  rides: CustomerRideList[];
  totalRecords:number;
  loading:boolean;
  event_status:any;
  selectedStatus:number = 2;
  
  constructor(private _customersService: CustomerService,) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: AdminCustomerListDAO) {
    if (value) {
      this._details = value;
      this.loadCustomerRideList(this.event_status)
    }
  }

  get details(): AdminCustomerListDAO {
    return this._details;
  }
  loadCustomerRideList(event: LazyLoadEvent) {
    this.event_status = event;
    this.loading = true;
    setTimeout(() => {
      this._customersService
      .getCustomerRidelist(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter, 
        event.sortField, 
        event.sortOrder,
        this.selectedStatus,
        this.details.id
        )
        .subscribe(response => {
        this.rides = response.ridedto.data;
        this.totalRecords = response.ridedto.totalCount;
        if (this.rides) {
          this.loading = false;
        }
      });
    }, 1000);
  }

}
