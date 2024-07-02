import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProjectEventService } from 'src/app/demo/service/project-event.service';

@Component({
  selector: 'app-event-ticket-list',
  templateUrl: './event-ticket-list.component.html',
  styleUrls: ['./event-ticket-list.component.scss']
})
export class EventTicketListComponent implements OnInit {
totalRecords: any;
eventTicketListDAO: any;
loading: any;
  filterGlobalValue: any;
  startDate: any;
  endDate: any;
  @ViewChild(Table, { static: false }) tableEvent;

constructor(private service: ProjectEventService) { }

ngOnInit(): void {
}
onRangeChange(reset) {
  if (reset) {
      this.startDate = ""
      this.endDate = ""
  } this.loadEventticket(this.tableEvent)
}
onDateChange(data) {
  this[`${data.type}Date`] = data.date
}

loadEventticket(event: any) {
  this.loading = true;
  this.service.getAllProjectEventTickets(event.first / event.rows + 1,
    event.rows,
    event.globalFilter ?? this.filterGlobalValue,
    event.sortField,
    event.sortOrder,
    !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "").subscribe(res => {
    this.eventTicketListDAO = res?.data?.results;
    this.totalRecords = res?.data?.rowCount;
    this.loading=false;
  },
  err=>{
    this.loading=false;
  }
)
}
openUpdate(data){
console.log("🚀 ~ EventTicketListComponent ~ openUpdate ~ data:", data)

}
resetDataTable(event)
{
  this.filterGlobalValue = "";
  this.startDate = ""
  this.endDate = ""
  this.loadEventticket(this.tableEvent)
}

}
