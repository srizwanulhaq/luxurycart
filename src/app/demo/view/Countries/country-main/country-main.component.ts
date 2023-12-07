import { Component, OnInit } from '@angular/core';
import { EditCountryDto } from 'src/app/demo/domain/Dto/Countries/EditCountryDto';

@Component({
  selector: 'app-country-main',
  templateUrl: './country-main.component.html',
  styleUrls: ['./country-main.component.scss']
})
export class CountryMainComponent implements OnInit {

  event: Event;
  editCountryData: EditCountryDto;
  editPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    this.event = event;
}
onEditPanelButtonClick(event, editCountryData: EditCountryDto) {
  this.editCountryData = editCountryData;
  this.editPanelActive = !this.editPanelActive;
  event.preventDefault();
  this.event = null;
}
}
