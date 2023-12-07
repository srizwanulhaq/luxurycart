import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectorRef,ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Customer_Insurance } from 'src/app/demo/domain/Dao/CustomerInsurance/customer-insurance';
import { Table } from 'primeng/table';
import { CustomerInsuranceService } from 'src/app/demo/service/customer-insurance.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerInsuranceMainComponent } from '../customer-insurance-main/customer-insurance-main.component';

@Component({
  selector: 'app-customer-insurance-listing',
  templateUrl: './customer-insurance-listing.component.html',
  styleUrls: ['./customer-insurance-listing.component.scss'],
  providers: [MessageService, DatePipe, ConfirmationService],
})
export class CustomerInsuranceListingComponent implements OnInit {
  @Output() eventChange = new EventEmitter<Event>();
  cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    @ViewChild("dt", { static: false }) resultTable: Table;
  event_status: any;
  statuses: SelectItem[] = [];
  customerInsuranceList: Customer_Insurance[];
  @ViewChild(Table, { static: false }) tableEvent;
    filterGlobalValue: any;
    startDate: string = ""
    endDate: string = "";
    selectedStatus:number=1;
    totalRecords: number;
    loading: boolean = true;
  constructor(private cdref: ChangeDetectorRef,
    private service:CustomerInsuranceService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    public main:CustomerInsuranceMainComponent) {
      localStorage.removeItem("adminCustomerInsurance-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter.replace(/[+]/g, '');
            }

        });
     }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}

  ngOnInit(): void {
    this.statuses = [
      { label: 'Paid', value: 1 },
      { label: 'Unpaid', value: 2 },
      { label: 'Refund', value: 3 }
    ]
  }
  @Input()
  set event(event: Event) {
      if (event) {
          this.loadCustomerInsuranceLazy(this.tableEvent);
      }
  }
  loadCustomerInsuranceLazy(event: LazyLoadEvent) {
    this.event_status = event;
    setTimeout(() => {
        this.loading = true;
        this.service.getCustomerInsurance(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter ?? this.filterGlobalValue,
                event.sortField,
                event.sortOrder,
                this.selectedStatus,
                !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
            ).then((response) => {
                this.customerInsuranceList = response.results;
                this.totalRecords = response.rowCount;
                if (this.customerInsuranceList) {
                    this.loading = false;
                }
            });
    }, 500);
    
}
resetDataTable(dt) {
  localStorage.removeItem("adminCustomerInsurance-local");
  this.filterGlobalValue = null;
  dt.reset(); // reset the table
  this.customerInsuranceList = null;
  this.router.navigate(["/customer-insurance/customer-insurance-main"]);
  this.filterGlobalValue=undefined;
  this.startDate=null;
  this.endDate=null;
}
onRangeChange(reset) {
  if (reset) {
      this.startDate = ""
      this.endDate = ""
  }
  this.loadCustomerInsuranceLazy(this.tableEvent)
}
statusChanged(e) {
  if (e.index == 0)
      this.selectedStatus = e.index + 1;
  if (e.index == 1)
      this.selectedStatus = e.index + 1;
  if (e.index == 2)
      this.selectedStatus = e.index + 1;
  this.loadCustomerInsuranceLazy(this.tableEvent);
}
onDateChange(data) {
  this[`${data.type}Date`] = data.date
}
}
