import { Component, OnInit } from '@angular/core';
import { VehicleRentRequestDao } from 'src/app/demo/domain/Dao/VehicleRentRequest/vehicle-rent-requestDao';

@Component({
  selector: 'app-rent-request-main',
  templateUrl: './rent-request-main.component.html',
  styleUrls: ['./rent-request-main.component.scss']
})
export class RentRequestMainComponent implements OnInit {

  rent: VehicleRentRequestDao;
  bottomPanelActive: boolean;
  event:Event;
  constructor() { }

  ngOnInit(): void {
  }
  onBottomPanelButtonClick(event, rent) {

    this.rent = rent;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
}
onChange(event) {
  this.event = event;
}
}
