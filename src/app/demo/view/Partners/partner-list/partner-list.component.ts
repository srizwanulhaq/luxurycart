import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PartnerDto } from 'src/app/demo/domain/Dto/Partners/partner-dto';
import { PartnerService } from 'src/app/demo/service/partner.service';
import { PartnerMainComponent } from '../partner-main/partner-main.component';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstPartners: PartnerDto[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;

  constructor(private service: PartnerService,
    public main: PartnerMainComponent,
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPartners(this.tableEvent);
    }
  }

  loadPartners(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
      this.service.getAllPartners(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter ?? this.filterGlobalValue,
        event.sortField,
        event.sortOrder
      ).then(res => {
        this.lstPartners = res.results;
        this.totalRecords = res.rowCount;
        this.loading = false;
      })
    }, 1000);
  }
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("partnerListDao-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}
}
