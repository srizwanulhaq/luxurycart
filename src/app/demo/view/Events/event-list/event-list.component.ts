import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';
import { ProjectEventService } from 'src/app/demo/service/project-event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  loading: any;
  eventListDAO: any;
  totalRecords: any;
  filterGlobalValue: any;
  startDate: any;
  endDate: any;
  @ViewChild(Table, { static: false }) tableEvent;
  
  constructor(private service: ProjectEventService,private observer:NamedObservableService)
   { }
  
  ngOnInit(): void {
    this.observer.getObservable("callProjectEventList").subscribe(res=>{
      if (res) {
        this.loadloadManageIotLazy(this.tableEvent);
      }
    });

  }
  openUpdate(data){
    this.observer.register("callProjectEventUpdate")
    this.observer.updateValue("callProjectEventUpdate",data)
  }
  
  loadloadManageIotLazy(event: LazyLoadEvent) {
    this.loading=true;
    this.service.getAllProjectEvents(           
       event.first / event.rows + 1,
      event.rows,
      event.globalFilter ?? this.filterGlobalValue,
      event.sortField,
      event.sortOrder,
      !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "")
      .subscribe(res => {
        console.log('dddd');
        this.eventListDAO=res?.data?.results;
        this.loading=false;
        
      },
      error => {
        this.loading=false;
      })
  }
  resetDataTable(event){
    this.filterGlobalValue='';
    this.loadloadManageIotLazy(this.tableEvent)
  }
  onRangeChange(reset) {
    if (reset) {
        this.startDate = ""
        this.endDate = ""
    } this.loadloadManageIotLazy(this.tableEvent)
  }
  onDateChange(data) {
    this[`${data.type}Date`] = data.date
  }
}
