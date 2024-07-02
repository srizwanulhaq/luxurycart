import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { GameService } from 'src/app/demo/service/game.service';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  startDate: string;
  endDate: string;
  loading: any;
  gameListDAO: any;
totalRecords: any;
@ViewChild(Table, { static: false }) tableEvent;
  filterGlobalValue: string;

  constructor(private service:GameService,private observer :NamedObservableService) { }

  ngOnInit(): void {
    this.observer.getObservable("callGameList").subscribe(observer=>{
      this.loadGame(this.tableEvent)
    })
  }
  loadGame($event: any) {
    this.loading = true;
    this.service.getAllGame($event.first / $event.rows + 1,
      $event.rows,
      $event.globalFilter ?? "",
      $event.sortField,
      $event.sortOrder,
      !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").subscribe(res => {
      this.gameListDAO = res?.data?.results;
      this.totalRecords = res?.data?.rowCount;
      this.loading=false;
    },
    err=>{
      this.loading=false;
    }
    )
  }
  onRangeChange(reset) {
    if (reset) {
        this.startDate = ""
        this.endDate = ""
    } this.loadGame(this.tableEvent)
  }
  onDateChange(data) {
    this[`${data.type}Date`] = data.date
  }
  openUpdate(gameItem){
    console.log("🚀 ~ GameListComponent ~ openUpdate ~ gameItem:", gameItem)
    this.observer.register("openGameUpdate")
    this.observer.updateValue("openGameUpdate",gameItem)
  }
  resetDataTable(event:any)
{
  event.filters.global.value='';
  this.filterGlobalValue = "";
  this.startDate = ""
  this.endDate = ""
  
  this.loadGame(event)
}

}
