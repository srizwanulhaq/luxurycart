import { Component, OnInit } from '@angular/core';
import { EditCityDto } from 'src/app/demo/domain/Dto/Cities/EditCityDto';


@Component({
  selector: 'app-city-main',
  templateUrl: './city-main.component.html',
  styleUrls: ['./city-main.component.scss'],
})
export class CityMainComponent implements OnInit {
  
  event: Event;
  editCityData: EditCityDto;
  editPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    this.event = event;
}

onEditPanelButtonClick(event, editCityData: EditCityDto) {
  this.editCityData = editCityData;
  this.editPanelActive = !this.editPanelActive;
  event.preventDefault();
  this.event = null;
}
}
