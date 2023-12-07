import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { logsDetail } from 'src/app/demo/domain/Dto/logs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LogsService } from 'src/app/demo/service/logs.service';
import { LogsMainComponent } from '../logs-main/logs-main.component';
import { first } from "rxjs/operators";
@Component({
  selector: 'app-logs-details',
  templateUrl: './logs-details.component.html',
  styleUrls: ['./logs-details.component.scss']
})
export class LogsDetailsComponent implements OnInit {
  private _details:logsDetail;
  
 
  constructor(public main: LogsMainComponent,
    private messageService: MessageService,
    //private _confirmationService: ConfirmationService,
    private _LogsService: LogsService
    
    ) { }
 
  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input() 
  set details(value: logsDetail) {
  console.log(value);
    if (value) {
      this._details = value;
    }
  }
  get details(): logsDetail {
    return this._details;
  }
  
}
