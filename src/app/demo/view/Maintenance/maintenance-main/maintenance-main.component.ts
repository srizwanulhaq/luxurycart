import { Component, OnInit } from '@angular/core';
import { MaintenanceDao } from 'src/app/demo/domain/Dao/Maintenance/maintenance-dao';

@Component({
  selector: 'app-maintenance-main',
  templateUrl: './maintenance-main.component.html',
  styleUrls: ['./maintenance-main.component.scss']
})
export class MaintenanceMainComponent implements OnInit {

  event: Event;
  maintenance: MaintenanceDao;
  bottomPanelActive:boolean;

  constructor() { }

  ngOnInit(): void {
  }
  onBottomPanelButtonClick(event, maintenance) {
    this.maintenance = maintenance;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onChange(event) {
    this.event = event;
}

}
