import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { CouponCode } from 'src/app/demo/domain/Dao/Promotions/coupon-code';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-coupon-code-listing',
  templateUrl: './coupon-code-listing.component.html',
  styleUrls: ['./coupon-code-listing.component.scss']
})
export class CouponCodeListingComponent implements OnInit {
  lstcouponcode: CouponCode[];
  cols: any[];
  rowsPerPageOptions = [10, 25, 50];
  totalRecords: number;
  loading: boolean = false;
  searchValue: any;
  selectedCouponCode:CouponCode[];
  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;

  constructor(public main: PromotionMainComponent, private service:PackagediscountService,  private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cols = [
      { field: "wallet_Packages.title", subfield: "wallet_Packages.title", header: "Title" },
      { field: "code", subfield: "code", header: "Code" },
      { field: "amount", subfield: "amount", header: "Amount" },
      { field: "expiry", subfield: "expiry", header: "Expiry" },
      { field: "active", subfield: "active", header: "Status" },
    ];
  }
  loadCouponCode(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.service.getcouponcode(event.first / event.rows + 1,
        event.rows,
        event.globalFilter,
        event.sortField,
        event.sortOrder,
        ).then(res => {
            this.lstcouponcode = res.results
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.loadCouponCode(this.tableEvent);
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  onChangeCouponCode(e:any,id:number) {
    var model = {
      id:  id,
    };
  }
  resetDataTable(dt) {
    localStorage.removeItem("lstcouponcode-local");
    this.searchValue = null;
    dt.reset(); // reset the table
    this.selectedCouponCode = null;
  }
}
