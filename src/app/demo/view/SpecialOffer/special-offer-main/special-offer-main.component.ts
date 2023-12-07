import { Component, OnInit } from '@angular/core';
import { SpecialOfferDao } from 'src/app/demo/domain/Dao/SpecialOffer/SpecialOfferDao';
import { EditSpecialOfferDto } from 'src/app/demo/domain/Dto/SpecialOffer/EditSpecialOfferDto';

@Component({
  selector: 'app-special-offer-main',
  templateUrl: './special-offer-main.component.html',
  styleUrls: ['./special-offer-main.component.scss']
})
export class SpecialOfferMainComponent implements OnInit {

  bottomPanelActive: boolean;
  offer:SpecialOfferDao;
  event: Event;
  editSpecialData:EditSpecialOfferDto;
  editPanelActive:boolean;

  constructor() { }

  ngOnInit(): void {
  }


  onBottomPanelButtonClick(event, offer){
    this.offer = offer;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onEditPanelButtonClick(event, editSpecialData:EditSpecialOfferDto){
    this.editSpecialData = editSpecialData;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
  }
  onChange(event){
    this.event = event;
  }

}
