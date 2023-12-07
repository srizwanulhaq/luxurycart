import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SpecialOfferDao } from 'src/app/demo/domain/Dao/SpecialOffer/SpecialOfferDao';
import { SpecialOfferService } from 'src/app/demo/service/special-offer.service';
import { SpecialOfferMainComponent } from '../special-offer-main/special-offer-main.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-special-offer-list',
  templateUrl: './special-offer-list.component.html',
  styleUrls: ['./special-offer-list.component.scss']
})
export class SpecialOfferListComponent implements OnInit {


  Offers: SpecialOfferDao[];
  totalRecords: number;
  event_status:any;
  rowsPerPageOptions = [10, 25, 50];
  filterGlobalValue:any;
  loading: boolean = false;
  constructor(private service: SpecialOfferService,
              public main: SpecialOfferMainComponent,
              private cdref: ChangeDetectorRef) { 
                localStorage.removeItem("SpecialOfferListDao-local");
              }


  @ViewChild(Table, { static: false }) tableEvent;


  ngOnInit(): void {
  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.loadSpecialOffer(this.tableEvent);
    }
  }
  loadSpecialOffer(event: LazyLoadEvent){
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
       this.service.getSpecialOffers(
            event.first / event.rows + 1, 
            event.rows, 
            event.globalFilter, 
            event.sortField,
            event.sortOrder,
          ).then(res => 
            {
              this.Offers = res.results;
              this.totalRecords = res.rowCount;
              this.loading = false;
          })
        }, 1000);
  }

  resetDataTable(dt) {
    localStorage.removeItem("SpecialOfferListDao-local");
    dt.reset();
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}
}
