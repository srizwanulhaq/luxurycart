import { Component, OnInit } from '@angular/core';
import { EditZoneDao } from 'src/app/demo/domain/Dao/Zone/EditZoneDao';
import { Parking_ZonesDto } from 'src/app/demo/domain/Dto/Zone/Parking_ZonesDto';

@Component({
  selector: 'app-zone-main',
  templateUrl: './zone-main.component.html',
  styleUrls: ['./zone-main.component.scss']
})
export class ZoneMainComponent implements OnInit {

  event: Event;
  zone: Parking_ZonesDto;
  editzoneData:EditZoneDao;
  bottomPanelActive: boolean;
  editPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event){
    this.event = event;
  }

  onBottomPanelButtonClick(event,zone:Parking_ZonesDto){
    this.zone = zone;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onEditPanelButtonClick(event, editzoneData:EditZoneDao){
    this.editzoneData = editzoneData;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
  }
}
