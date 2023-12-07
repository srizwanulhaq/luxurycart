import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map-main',
  templateUrl: './map-main.component.html',
  styleUrls: ['./map-main.component.scss']
})
export class MapMainComponent implements OnInit {



  event: Event;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }

 
}


