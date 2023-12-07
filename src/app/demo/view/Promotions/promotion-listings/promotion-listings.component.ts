import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Packagediscount } from 'src/app/demo/domain/Dao/Promotions/packagediscount';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { PromotionMainComponent } from '../promotion-main/promotion-main.component';

@Component({
  selector: 'app-promotion-listings',
  templateUrl: './promotion-listings.component.html',
  styleUrls: ['./promotion-listings.component.scss']
})
export class PromotionListingsComponent implements OnInit {
  lstpackagediscount: Packagediscount[];
  cols: any[];
  rowsPerPageOptions = [10, 25, 50];
  searchValue: any;
  totalRecords: number;
  loading: boolean = false;
  selectedpackagediscount:Packagediscount[];
  @Output() eventChange = new EventEmitter<Event>();
  @ViewChild(Table, { static: false }) tableEvent;

  constructor(public main: PromotionMainComponent, private service:PackagediscountService,  private cdref: ChangeDetectorRef) { 
  }

  ngOnInit(): void {

    this.cols = [
      { field: "parking_Zones.title", subfield: "parking_Zones.title", header: "Title" },
      { field: "code", subfield: "code", header: "Code" },
      { field: "percentage_Discount", subfield: "percentage_Discount", header: "Discount" },
      { field: "max_Purchase", subfield: "max_Purchase", header: "Maximum Purchase" },
      { field: "expiry", subfield: "expiry", header: "Expiry" },
      { field: "active", subfield: "active", header: "Status" },
    ];
  }
  loadPackageDiscount(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.service.get(event.first / event.rows + 1,
        event.rows,
        event.globalFilter,
        event.sortField,
        event.sortOrder,
        ).then(res => {
            this.lstpackagediscount = res.results
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPackageDiscount(this.tableEvent);
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  onChangePackageDiscount(e:any,id:number) {
    var model = {
      id:  id,
    };
  }
  resetDataTable(dt) {
    localStorage.removeItem("lstpackagediscount-local");
    this.searchValue = null;
    dt.reset(); // reset the table
    this.selectedpackagediscount = null;
  }

}
