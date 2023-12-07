import { Component, OnInit } from '@angular/core';
import { EditCurrencyDto } from 'src/app/demo/domain/Dto/Currencies/EditCurrencyDto';
import { logsDetail } from 'src/app/demo/domain/Dto/logs';

@Component({
  selector: 'app-logs-main',
  templateUrl: './logs-main.component.html',
  styleUrls: ['./logs-main.component.scss']
})
export class LogsMainComponent implements OnInit {

  
  event: Event;
  //editCurrencyData: EditCurrencyDto;
 // editPanelActive:boolean;
 Logs: logsDetail;
 bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  // alert('page in');
  }
  onChange(event) {
    this.event = event;
   } 
   onBottomPanelButtonClick(event, LogsDetail : logsDetail) {
   //  console.log('click');
    this.Logs = LogsDetail;
   this.bottomPanelActive = !this.bottomPanelActive;
   event.preventDefault();
//   this.event = null;
   }
 onBottomPanelClick() {
  this.bottomPanelActive = true;
}

}
