import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { CodeUseDao } from 'src/app/demo/domain/Dao/Promotions/CodeUsesDao';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';

@Component({
    selector: 'app-code-uses-listing',
    templateUrl: './code-uses-listing.component.html',
    styleUrls: ['./code-uses-listing.component.scss']
})
export class CodeUsesListingComponent implements OnInit {
    @Input() type: "promo" | "coupon" | "discount" | "package"
    @Input() code: string
    @Input() code_id: string
    list: CodeUseDao[];
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    searchValue: string = "";
    selectedCodeUses: CodeUseDao[];
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;
    constructor(private service: PackagediscountService, private cdref: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.cols = [
            { field: "Customer", subfield: "customer", header: "Customer" },
            { field: "Country", subfield: "country", header: "Country" },
            { field: "Created At", subfield: "created_at", header: "Created At" },
        ];
    }

    ngOnChanges(change: SimpleChange) {
        if (!!change["code_id"] && change['code_id'].currentValue != change['code_id'].previousValue) {
            this.tableEvent = undefined
            this.searchValue = ""
            this.loadCodeUses()
        }
    }

    loadCodeUses(reset: boolean = false) {
        if (reset) {
            this.tableEvent = undefined
            this.searchValue = ""
        }
        const event = this.tableEvent
        this.loading = true;
        setTimeout(() => {
            this.service.getCodeUses(
                this.code_id,
                this.type,
                this.searchValue,
                ...(!!event ? [event.first / event.rows + 1,
                event.rows,
                event.sortField,
                event.sortOrder
                ] : [])
            ).then(res => {
                this.list = res.list
                this.totalRecords = res.total;
                this.loading = false;
            })
        }, 1000);
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    resetDataTable(dt) {
        localStorage.removeItem("code-uses-local");
        this.searchValue = null;
        dt.reset(); // reset the table
        this.selectedCodeUses = [];
    }
}
