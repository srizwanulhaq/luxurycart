import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-command-main',
  templateUrl: './pending-command-main.component.html',
  styleUrls: ['./pending-command-main.component.scss']
})
export class PendingCommandMainComponent implements OnInit {

  event: Event;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }
}
