import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Discountcode } from 'src/app/demo/domain/Dao/Promotions/discountcode';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-discount-code-listing',
  templateUrl: './discount-code-listing.component.html',
  styleUrls: ['./discount-code-listing.component.scss']
})
export class DiscountCodeListingComponent implements OnInit {
  lstdiscountcode: Discountcode[];
  cols: any[];
  rowsPerPageOptions = [10, 25, 50];
  totalRecords: number;
  loading: boolean = false;
  searchValue: any;
  selecteddiscountcode:Discountcode[];
  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;
  constructor(public main: PromotionMainComponent, private service:PackagediscountService,  private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cols = [
      { field: "parking_Zones.title", subfield: "parking_Zones.title", header: "Title" },
      { field: "code", subfield: "code", header: "Code" },
      { field: "discount_Upto", subfield: "discount_Upto", header: "Discount Upto" },
      { field: "no_Of_Rides", subfield: "no_Of_Rides", header: "No of Rides" },
      { field: "expiry", subfield: "expiry", header: "Expiry" },
      { field: "active", subfield: "active", header: "Status" },
    ];
  }
  loadDiscountCode(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.service.getdiscountcode(event.first / event.rows + 1,
        event.rows,
        event.globalFilter,
        event.sortField,
        event.sortOrder,
        ).then(res => {
            this.lstdiscountcode = res.results
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.loadDiscountCode(this.tableEvent);
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  onChangeDiscountCode(e:any,id:number) {
    var model = {
      id:  id,
    };
  }
  resetDataTable(dt) {
    localStorage.removeItem("lstdiscountcode-local");
    this.searchValue = null;
    dt.reset(); // reset the table
    this.selecteddiscountcode = null;
  }
}
