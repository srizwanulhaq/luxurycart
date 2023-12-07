import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PromoCode } from 'src/app/demo/domain/Dao/Promotions/promo-code';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-promo-code-listing',
  templateUrl: './promo-code-listing.component.html',
  styleUrls: ['./promo-code-listing.component.scss']
})
export class PromoCodeListingComponent implements OnInit {
  lstpromocode: PromoCode[];
  cols: any[];
  rowsPerPageOptions = [10, 25, 50];
  totalRecords: number;
  loading: boolean = false;
  selectedPromoCode:PromoCode[];
  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;
  searchValue: any;

  constructor(public main: PromotionMainComponent, private service:PackagediscountService,  private cdref: ChangeDetectorRef) { 

  }

  ngOnInit(): void {
    
    this.cols = [
      { field: "number", subfield: "number", header: "Id" },
      { field: "code", subfield: "code", header: "Code" },
      { field: "quantity", subfield: "quantity", header: "Quantity" },
      { field: "per_Usage", subfield: "per_Usage", header: "Per Usage" },
      { field: "credits", subfield: "credits", header: "Credit" },
      { field: "start_Date", subfield: "start_Date", header: "Start Date" },
      { field: "end_Date", subfield: "end_Date", header: "End Date" },
      { field: "is_New_User", subfield: "is_New_User", header: "New User" },
      { field: "active", subfield: "active", header: "Status" },
    ];
  }
  loadPromoCode(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.service.getpromocode(event.first / event.rows + 1,
        event.rows,
        event.globalFilter,
        event.sortField,
        event.sortOrder,
        ).then(res => {
            this.lstpromocode =res.results
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPromoCode(this.tableEvent);
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  onChangePromoCode(e:any,id:number) {
    var model = {
      id:  id,
    };
  }
  resetDataTable(dt) {
    localStorage.removeItem("lstpromocode-local");
    this.searchValue = null;
    dt.reset(); // reset the table
    this.selectedPromoCode = null;
  }

}
