import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AdminCustomerListDAO } from 'src/app/demo/domain/Dao/Customers/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { first } from "rxjs/operators";
import { CustomerAlertService } from 'src/app/demo/service/customer-alert.service';
import { CustomersAlertdtos, SendSingleAlert } from 'src/app/demo/domain/Dao/Customers/customer-alert';
import { CustomerDetailsDto } from 'src/app/demo/domain/Dto/Customers/customer-details-dto';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  private _details:AdminCustomerListDAO;
  SendSingleAlert: SendSingleAlert = null;
  event_status: any;
  dt_status: any;
  totalRecords: number;
  pageSize: number = 10;
  cols: any[];
  loading:boolean = false;
  lstCustomersAlert: CustomersAlertdtos[];
  AlertPanelClick: boolean;
  AlertPanelActive: boolean;
  customerDetails:CustomerDetailsDto;
  countryCurrency:string;


  constructor(public main: CustomerMainComponent,
    private _customersService: CustomerService,
    private messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private AlertService:CustomerAlertService,
    
  ) { }

  ngOnInit(): void {

  }

  @Output() eventChange = new EventEmitter<Event>();
  @Input() 
  set details(value: AdminCustomerListDAO) {
    if (value) {
      this._details = value;
      this.getCustomerDetailsById(value.id);
      this.loadIndividualAlertLazy(this.event_status);
    }
  }
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadIndividualAlertLazy(this.event_status);
    }
  }

  get details(): AdminCustomerListDAO {
    return this._details;
  }
  
  onChangeGroupEligibility(e, id) {
    var group_Ride_Eligibility = e.checked;
    this._confirmationService.confirm({
      message: "Do you want to change eligibility?",
      header: "Change Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        //-------------------------------------
        var model = {
          id: id,
          group_Ride_Eligibility: group_Ride_Eligibility,
        };
        this._customersService
          .ChangeGroupEligibility(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
            },
            error: (error) => {
                this.main.bottomPanelActive = true;
                this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
   
      },
      reject: () => {
        this.details.group_Ride_Eligibility = !group_Ride_Eligibility;
      },
    });
  }

  blockAndUnBlock(id) {

    this.main.event = null;
    this._confirmationService.confirm({
      message:
        this.details.customerStatusNumber == 3
          ? "Do you want to block?"
          : "Do you want to un block?",
      header: "Block Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        
        var model = {
          id: id,
          customerStatusNumber: this.details.customerStatusNumber,
        };
        this._customersService
          .blockAndUnBlockCustomer(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
              
            },
            error: (error) => {
              this.main.bottomPanelActive = true;
                this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
     },
      reject: () => {
      },
    });
  }
  loadIndividualAlertLazy(event: LazyLoadEvent) {
    localStorage.removeItem("lstCustomersAlert-local");
    this.event_status = event;
    this.loading = true;
    setTimeout(() => {
      this.AlertService
      .getIndividualDetails(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter, 
        event.sortField, 
        event.sortOrder,
        this.details.id
        )
        .subscribe(response => {

        this.lstCustomersAlert = response.individualCustomer.data;
        this.totalRecords = response.individualCustomer.totalCount;
        if (this.lstCustomersAlert) {
          this.loading = false;
        }
      });
    }, 1000);
  }
  getCustomerDetailsById(CusId) {
    this._customersService.getCustomerDetails(CusId).subscribe(responseList => {
       this.customerDetails = responseList.customerDetails;
       this.countryCurrency = responseList.countryCurrency;
       
    });
  }
}
