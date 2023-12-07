import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PendingCommandDao } from 'src/app/demo/domain/Dao/PendingCommands/PendingCommandDao';
import { PendingCommandService } from 'src/app/demo/service/pending-command.service';

@Component({
  selector: 'app-pending-command-list',
  templateUrl: './pending-command-list.component.html',
  styleUrls: ['./pending-command-list.component.scss']
})
export class PendingCommandListComponent implements OnInit {
  loading: boolean = false;
  event_status: any;
  pending: PendingCommandDao[];
  totalRecords: number;
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  btnloading: boolean;
  filterGlobalValue: any;

  constructor(private service: PendingCommandService, private router: Router) {
    localStorage.removeItem("pendingCommandlist-local");
  }

  ngOnInit(): void {
  }
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadPending(this.tableEvent);
    }
  }
  loadPending(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
      this.service.getPendingCommand(
        event.first / event.rows + 1,
        event.rows,
        event.globalFilter,
        event.sortField,
        event.sortOrder
      ).then(res => {
        this.pending = res.results;
        this.totalRecords = res.rowCount;
        this.loading = false;
      })
    }, 1000);
  }
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("pendingCommandlist-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
    this.router.navigate(["/pendingCommand/pending-command-main"]);

  }
}
