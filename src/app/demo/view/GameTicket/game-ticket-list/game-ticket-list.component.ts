import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { GameService } from 'src/app/demo/service/game.service';

@Component({
  selector: 'app-game-ticket-list',
  templateUrl: './game-ticket-list.component.html',
  styleUrls: ['./game-ticket-list.component.scss']
})
export class GameTicketListComponent implements OnInit {
  loading: any;
  gameTicketListDAO: any;
  totalRecords: any;
  startDate: any;
  endDate: any;
  filterGlobalValue: string;
  @ViewChild(Table, { static: false }) tableEvent;
  
  constructor(private service:GameService) { }
  
  loadGameTicket($event: any) {
    this.loading = true;
    this.service.getAllGameTicket($event.first / $event.rows + 1,
      $event.rows,
      $event.globalFilter ?? "",
      $event.sortField,
      $event.sortOrder,
      !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").subscribe(res => {
      this.gameTicketListDAO = res?.data?.results;
      this.totalRecords = res?.data?.rowCount;
      this.loading=false;
    },
    err=>{
      this.loading=false;
    }
    )
  }
  ngOnInit(): void {
  }
  onRangeChange(reset) {
    if (reset) {
        this.startDate = ""
        this.endDate = ""
    } this.loadGameTicket(this.tableEvent)
  }
  onDateChange(data) {
    this[`${data.type}Date`] = data.date
  }
  openUpdate(gameItem){
    console.log("🚀 ~ GameListComponent ~ openUpdate ~ gameItem:", gameItem)
  }
  resetDataTable(event:any)
{
  event.filters.global.value='';
  this.filterGlobalValue = "";
  this.startDate = ""
  this.endDate = ""
  
  this.loadGameTicket(event)
}

}
