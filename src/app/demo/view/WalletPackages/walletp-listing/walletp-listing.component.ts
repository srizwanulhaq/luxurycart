import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { WalletPackageDao } from 'src/app/demo/domain/Dao/WalletPackages/WalletPackageDao';
import { WalletPackageService } from 'src/app/demo/service/walletPackageService';
import { WalletPackageMainComponent } from '../walletp-main/walletp-main.component';

@Component({
    selector: 'app-walletp-listing',
    templateUrl: './walletp-listing.component.html',
    styleUrls: ['./walletp-listing.component.scss'],
    providers: [MessageService, ConfirmationService],
})

export class WalletPackageListingComponent implements OnInit {
    
    show = false;
    filterVal: string = ''
    selectedWalletPackages: WalletPackageDao[]
    walletPackages: WalletPackageDao[];
    walletPackageData: WalletPackageDao;
    searchValue: any;
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    selectedStatus: number = 1;
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    position: string;
    disabledCategoryEndBtn: boolean = false;
    progressSpinner: boolean = false;
    filterGlobalValue:any;

    constructor(
        public main: WalletPackageMainComponent,
        private wPService: WalletPackageService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cdref: ChangeDetectorRef) { 
            localStorage.removeItem("WalletPackageList-local");

        }

    ngOnInit(): void {
        this.cols = [
            { field: "date", subfield: "date", header: "Date" },
            { field: "title", subfield: "title", header: "Package" },
            { field: "top_Up_Amount", subfield: "top_Up_Amount", header: "Top Up Amount" },
            { field: "bonus_Amount", subfield: "bonus_Amount", header: "Bonus Amount" },
            { field: "status", subfield: "status", header: "Status" },
            { field: "Action", header: "Action" },
        ];
    }

    loadWalletPackages(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.wPService.getWalletPackages(
                event.first / event.rows + 1,
                event.rows,
                event.globalFilter,
                event.sortField,
                event.sortOrder
            ).then(walletP => {
                this.walletPackages = walletP.packagesto.data;
                this.totalRecords = walletP.packagesto.totalCount;
                this.loading = false;
            })
        }, 1000);
    }

    resetDataTable(dt) {
        localStorage.removeItem("WalletPackageList-local");
        dt.reset();
        this.searchValue = ''
        this.selectedWalletPackages = null
        this.filterGlobalValue = null;
    }

    @Input()
    set event(event: Event) {
        if (event) {
            this.loadWalletPackages(this.tableEvent);
        }
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    

}


