import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Ridedao } from 'src/app/demo/domain/Dao/Rides/Ridedao';
import { marker, Vehiclesto } from 'src/app/demo/domain/Dao/Rides/RideTrack';
import { RideService } from 'src/app/demo/service/rideservice';


@Component({
  selector: 'app-ride-track',
  templateUrl: './ride-track.component.html',
  styleUrls: ['./ride-track.component.scss'],
  providers:[MessageService]
})
export class RideTrackComponent implements OnInit {

  private _details:Ridedao;
  vehiclesto:Vehiclesto;
  markers: marker[];
  zoom: number = 8;
  lat: number = 0;
  lng: number = 0;
  scroll: boolean = false;
  marker:marker;
    

  constructor(private service:RideService, 
              private messageService: MessageService) { }

  ngOnInit(): void {
  }
  @Input() 
  set details(value: Ridedao) {
    if (value) {
      this._details = value;
      this.onGoingRideTracking();
      
    }
  }

  get details(): Ridedao {
    return this._details;
  }

  onGoingRideTracking() {
    //------------------------------------------------------------------
    this.service.onGoingRideTracking(this.details.vehicle.id).pipe(first()).subscribe({
      next: response => {
        this.vehiclesto = response.vehiclesto;
        this.lat = this.vehiclesto.vehicle_Location.latitude;
        this.lng = this.vehiclesto.vehicle_Location.longitude;
        this.markers = [
          {
            lat:this.vehiclesto.vehicle_Location.latitude,
            lng:this.vehiclesto.vehicle_Location.longitude,
            label: this.vehiclesto.number,
            draggable: true,
            visible: false,
            opacity: 0.7,
            number: this.vehiclesto.number,
          },
        ];

      },
      error: error => {
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error, life: 3000});
      }
    });

    }


}


