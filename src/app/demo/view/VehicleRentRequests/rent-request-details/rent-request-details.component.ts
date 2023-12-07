import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { VehicleRentRequestDao, Vehicles_Rent_Status } from 'src/app/demo/domain/Dao/VehicleRentRequest/vehicle-rent-requestDao';
import { VehicleRentRequestService } from 'src/app/demo/service/vehicle-rent-request.service';
import { RentRequestMainComponent } from '../rent-request-main/rent-request-main.component';

@Component({
  selector: 'app-rent-request-details',
  templateUrl: './rent-request-details.component.html',
  styleUrls: ['./rent-request-details.component.scss'],
  providers: [MessageService],
})
export class RentRequestDetailsComponent implements OnInit {

  private _details: VehicleRentRequestDao;
  itemsVehicleRentStatus: Vehicles_Rent_Status[];
  
  constructor(public main: RentRequestMainComponent,
    private service: VehicleRentRequestService,
    private messageService: MessageService) {
      this.allVehicleRentStatusLoad();
     }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set details(value: VehicleRentRequestDao) {
      if (value) {
          this._details = value;
      }
  }

  get details(): VehicleRentRequestDao {
      return this._details;
  }

  
  allVehicleRentStatusLoad() {
    this.service.getAllVehicleRentStatus().subscribe(data => {
      this.itemsVehicleRentStatus = data;
      var itemsVehicleResntStatus = [];
      this.itemsVehicleRentStatus.forEach(function (item_status) {
        itemsVehicleResntStatus.push({ label: item_status.title, value: item_status.number });
      });
      this.itemsVehicleRentStatus = itemsVehicleResntStatus;
      //------for drop down demo end----

    });
  }
  ChangeRentVehicleStatus(rentId: string, rentStatusNumber: number) {

    this.service.changeRentVehicleStatus(rentId, rentStatusNumber).
    pipe(first()).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
      }
    });

  }
}
