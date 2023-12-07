import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaintenanceDao, MaintenanceInventoryDao } from 'src/app/demo/domain/Dao/Maintenance/maintenance-dao';
import { MaitenanceService } from 'src/app/demo/service/maitenance.service';
import { MaintenanceMainComponent } from '../maintenance-main/maintenance-main.component';

@Component({
  selector: 'app-maintenance-details',
  templateUrl: './maintenance-details.component.html',
  styleUrls: ['./maintenance-details.component.scss']
})
export class MaintenanceDetailsComponent implements OnInit {

  private _details:MaintenanceDao;
  lstMaintenanceDetails: MaintenanceInventoryDao[];
  constructor(public main: MaintenanceMainComponent,private _service: MaitenanceService) { }

  ngOnInit(): void {
  }

  @Output() eventChange = new EventEmitter<Event>();
  
  @Input() 
  set details(value: MaintenanceDao) {
    if (value) {
      this._details = value;
      this.InventoryDetails(value.id)
    }
  }

  get details(): MaintenanceDao {
    return this._details;
  }

  InventoryDetails(maintenanceId) {
    this.lstMaintenanceDetails = [];
      this._service
        .getInventoryDetails(maintenanceId)
        .subscribe((resp) => {
          this.lstMaintenanceDetails = resp.data;
        });
    }
  }


