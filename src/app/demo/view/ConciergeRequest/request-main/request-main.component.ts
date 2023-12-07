import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-main',
  templateUrl: './request-main.component.html',
  styleUrls: ['./request-main.component.scss']
})
export class RequestMainComponent implements OnInit {

  event: Event;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    this.event = event;
  }

}
