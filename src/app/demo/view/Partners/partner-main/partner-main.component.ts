import { Component, OnInit } from '@angular/core';
import { PartnerDto } from 'src/app/demo/domain/Dto/Partners/partner-dto';

@Component({
  selector: 'app-partner-main',
  templateUrl: './partner-main.component.html',
  styleUrls: ['./partner-main.component.scss']
})
export class PartnerMainComponent implements OnInit {


  event: Event;
  bottomPanelActive:boolean;
  partner:PartnerDto;

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    this.event = event;
  }


  onBottomPanelButtonClick(event,partner:PartnerDto){
    this.partner = partner;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
}
