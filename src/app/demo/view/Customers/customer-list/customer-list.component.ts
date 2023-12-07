import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { Table } from "primeng/table";
import { CustomerService } from '../../../service/customer.service';
import { DatePipe } from '@angular/common';
import { first } from "rxjs/operators";
import { CustomerMainComponent } from '../customer-main/customer-main.component';
import { AdminCustomerListDAO, Customer, CustomerStatus } from 'src/app/demo/domain/Dao/Customers/customer';
import { SendCustomersAlertdao } from 'src/app/demo/domain/Dao/Customers/customer-alert';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerAlertService } from 'src/app/demo/service/customer-alert.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConciergeRequestService } from 'src/app/demo/service/concierge-request.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    providers: [MessageService, DatePipe, ConfirmationService],
})
export class CustomerListComponent implements OnInit {


    adminCustomerListDAO: AdminCustomerListDAO[];
    adminCustomerModel: AdminCustomerListDAO;
    _customerStatus: CustomerStatus[];
    itemsCustomerStatus: SelectItem[];
    customerStatusValue: number = 1;
    event_status: any;
    dt_status: any;
    submitted: any;
    statuses: any[];
    loading: boolean = true;
    totalRecords: number;
    btnloading: boolean = false;
    cols: any[];
    exportColumns: any[];
    rowsPerPageOptions = [10, 25, 50];
    @ViewChild("dt", { static: false }) resultTable: Table;
    @ViewChild("gf") filterInput;
    @ViewChild(Table, { static: false }) tableEvent;
    searchValue: any;
    rangeDates: Date[];
    displayBasic: boolean;
    displayBasicImage: boolean;
    startDate: string = ""
    endDate: string = ""

    sendCustomersAlertdao: SendCustomersAlertdao;
    sendCustomerAlertForm: FormGroup;
    sendNewCustomerAlertshow: boolean = false;
    itemCustomersAlert: any = [];
    itemCustomersAlert2: any = [];
    selectedCustomersAlert: any = [];
    selectedCustomers: AdminCustomerListDAO[];
    filterGlobalValue: any;

    constructor(private _customersService: CustomerService,
        public _datepipe: DatePipe,
        private messageService: MessageService,
        public main: CustomerMainComponent,
        private cdref: ChangeDetectorRef,
        private AlertService: CustomerAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        localStorage.removeItem("adminCustomerListDAO-local");
        activatedRoute.queryParams.subscribe((params: Params) => {

            const parameter = params['customdata'];
            if (parameter !== undefined) {
                this.filterGlobalValue = parameter.replace(/[+]/g, '');
            }

        });
    }


    @Output() eventChange = new EventEmitter<Event>();

    ngOnInit(): void {
        this.allCustomerStatusLoad();
        this.sendCustomerAlertForm = new FormGroup({
            id: new FormControl(""),
            customers: new FormControl("", [Validators.required]),
            eng_Message: new FormControl("", [Validators.required]),
            //arabic_Message: new FormControl("", [Validators.required]),
            title:new FormControl("", [Validators.required]),
        });
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
    @Input()
    set event(event: Event) {
        if (event) {
            this.loadCustomersLazy(this.tableEvent);
        }
    }

    loadCustomersLazy(event: LazyLoadEvent) {
        this.event_status = event;
        setTimeout(() => {
            this.loading = true;
            this._customersService.getAllCustomersParams(
                    event.first / event.rows + 1,
                    event.rows,
                    event.globalFilter ?? this.filterGlobalValue,
                    event.sortField,
                    event.sortOrder,
                    this.customerStatusValue,
                    !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
                ).subscribe((response) => {
                    this.adminCustomerListDAO = response.customerto.data;
                    this.totalRecords = response.customerto.totalCount;
                    if (this.adminCustomerListDAO) {
                        this.loading = false;
                    }
                });
        }, 500);
        
    }

    
    resetDataTable(dt) {
        localStorage.removeItem("adminCustomerListDAO-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.selectedCustomers = null;
        this.router.navigate(["/customers/customer-main"]);
        this.filterGlobalValue = null;
    }
    allCustomerStatusLoad() {
        this._customersService.getAllCustomerStatus().subscribe((data) => {
            this._customerStatus = data;
            var itemsCustomerStatus = [];
            this._customerStatus.forEach(function (item_status) {
                itemsCustomerStatus.push({
                    label: item_status.title,
                    value: item_status.number,
                });
            });
            this.itemsCustomerStatus = itemsCustomerStatus;
        });
    }
    getRecordByDateRange() {
        let startDate = this._datepipe.transform(this.rangeDates[0], "yyyy-MM-dd");
        let endDate = this._datepipe.transform(this.rangeDates[1], "yyyy-MM-dd");

        this._customersService
            .getCustomerRecordByDateRange(0 / 10 + 1, 10, startDate, endDate)
            .subscribe((response) => {
                this.adminCustomerListDAO = response.customerto.data;
                this.totalRecords = response.customerto.totalCount;

                if (this.adminCustomerListDAO) {
                    this.loading = false;
                }
            });

        this.displayBasic = false;
    }

    FilterByCustomerStatus(selectedStatus) {
        this.customerStatusValue = selectedStatus;
        this.loadCustomersLazy(this.tableEvent);
    }

    showCustomersAlertForm() {
        this.submitted = false;
        if (this.selectedCustomers == undefined || this.selectedCustomers.length <= 0) {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please select at least one customer', life: 3000 });
            this.sendNewCustomerAlertshow = false;
            return;
        }
     
        var _itemCustomersAlert = [];
        this.selectedCustomers.forEach(function (item) {
            _itemCustomersAlert.push({
                name: item.full_Name + " (" + item.phone + ")",
            });
        });
        this.itemCustomersAlert = _itemCustomersAlert;
        this.selectedCustomersAlert = this.itemCustomersAlert;

        var _itemCustomersAlert2 = [];
        this.selectedCustomers.forEach(function (item) {
            _itemCustomersAlert2.push(item.id);
        });
        this.itemCustomersAlert2 = _itemCustomersAlert2;


        this.sendNewCustomerAlertshow = true;
    }

    onSubmitCustomersAlertForm() {
        this.btnloading = true;
        this.submitted = true;
        if (this.sendCustomerAlertForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.sendCustomerAlertForm.value.customers = null;
        this.sendCustomerAlertForm.value.customers = this.itemCustomersAlert2;

        this.sendCustomersAlertdao = this.sendCustomerAlertForm.value;
        if (
            this.sendCustomersAlertdao.customers == null ||
            this.sendCustomersAlertdao.customers.length <= 0 ||
            this.sendCustomersAlertdao.customers.length > 20
        ) {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Selected Customers must be at least one and greater than equal to 20', life: 3000 });
            this.sendNewCustomerAlertshow = false;
            return;
        }

        this.onSendCustomersAlert(this.sendCustomersAlertdao);
    }
    onSendCustomersAlert(sendCustomersAlertdao: SendCustomersAlertdao) {
        this.btnloading = true;
        this.AlertService
            .sendCustomersAlert(sendCustomersAlertdao)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.result) {
                        this.eventChange.emit(response.result);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.btnloading = false;
                        this.sendNewCustomerAlertshow = false;
                   
                        this.resetCustomerAlert();
                        this.loadCustomersLazy(this.event_status);
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                        this.btnloading = false;
                        this.sendNewCustomerAlertshow = true;
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                    this.btnloading = false;
                    this.sendNewCustomerAlertshow = true;
                },
            });
    }

    resetCustomerAlert() {
        this.selectedCustomers = null;
        this.itemCustomersAlert = null;
        this.selectedCustomersAlert = null;
        this.sendCustomerAlertForm.reset();
    }

    statusChanged(e) {
        this.customerStatusValue = e.index + 1;
        this.loadCustomersLazy(this.tableEvent);
    }

    onRangeChange(reset) {
        if (reset) {
            this.startDate = ""
            this.endDate = ""
        }
        this.loadCustomersLazy(this.tableEvent)
    }

    onDateChange(data) {
        this[`${data.type}Date`] = data.date
    }
}
