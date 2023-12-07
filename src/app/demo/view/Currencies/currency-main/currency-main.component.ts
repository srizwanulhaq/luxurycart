import { Component, OnInit } from '@angular/core';
import { EditCurrencyDto } from 'src/app/demo/domain/Dto/Currencies/EditCurrencyDto';

@Component({
  selector: 'app-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.scss']
})
export class CurrencyMainComponent implements OnInit {

  event: Event;
  editCurrencyData: EditCurrencyDto;
  editPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    this.event = event;
}
onEditPanelButtonClick(event, editCurrencyData: EditCurrencyDto) {
  this.editCurrencyData = editCurrencyData;
  this.editPanelActive = !this.editPanelActive;
  event.preventDefault();
  this.event = null;
}
}
