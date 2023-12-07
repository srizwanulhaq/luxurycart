import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Vehicledao } from 'src/app/demo/domain/Dao/Vehicle/Vehicledao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';
import { MouseEvent } from "@agm/core";
import { marker } from 'src/app/demo/domain/Dto/Vehicles/VehicleLocationDto';

@Component({
  selector: 'app-vehicle-change-location',
  templateUrl: './vehicle-change-location.component.html',
  styleUrls: ['./vehicle-change-location.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class VehicleChangeLocationComponent implements OnInit {
  
  private _details:Vehicledao;
  latitude:number;
  longitude:number;
  btnloading:boolean;
   zoom: number = 8;
   location_latitude: number = 0;
   location_longitude: number = 0;
   currentlat: number = 0.0;
   currentlng: number = 0.0;
   marker:marker;

  constructor(public main: VehicleMainComponent,
             private service: VehicleService,
            private messageService: MessageService,
            private confirmService: ConfirmationService) { }


  @Input() 
  set details(value: Vehicledao) {
    if (value) {
      this._details = value;
      this.latitude = this.details.vehicleLocation == null ? this.location_latitude: this.details.vehicleLocation.latitude;
      this.longitude = this.details.vehicleLocation == null ? this.location_longitude: this.details.vehicleLocation.longitude;
      this.onShowVehicleLocation()
    }
  }
    @Output() eventChange = new EventEmitter<Event>();
  get details(): Vehicledao {
    return this._details;
  }
  ngOnInit(): void {
  }

   onShowVehicleLocation() { 
     this.setCurrentPosition();
     this.location_latitude =
          this.latitude;
     this.location_longitude =
         this.longitude;
    
     this.markers = [];
     this.markers.push({
       lat: this.location_latitude,
       lng: this.location_longitude,
       draggable: true,
     });
 
     //----------------------------------------------------
   }

 
   clickedMarker(label: string, index: number) {
     console.log(`clicked the marker: ${label || index}`);
   }
 
   mapClicked($event: MouseEvent) {
     this.markers = [];
     this.markers.push({
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: true,
     });
     this.location_latitude = $event.coords.lat;
     this.location_longitude = $event.coords.lng;
   }
 
   markerDragEnd(m: marker, $event: MouseEvent) {
     console.log("dragEnd", m, $event);
   }
 
   markers: marker[] = [
     {
       lat: 0,
       lng: 0,
       label: "A",
       draggable: true,
     },
   ];
 
   
   private setCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.currentlat = position.coords.latitude;
         this.currentlng = position.coords.longitude;
       });
     }
   }
 
   onUpdateMapPointer() {
     this.markers = [];
     this.markers.push({
       lat: this.location_latitude,
       lng: this.location_longitude,
       draggable: true,
     });
   }

  onSaveVehicleLocation() {
    //------------------------------------------------------------------
    this.main.locationPanelActive = false;
    var model = {
      "id": this.details.vehicleLocation == null ? null : this.details.vehicleLocation.id,
      "vehicle_Id":this.details.id,
      "latitude":this.location_latitude,
      "longitude":this.location_longitude
    }
    this.confirmService.confirm({
      message: "Do you want to save?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.service
          .saveVehicleLocation(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
        //-------------------
      },
      reject: () => {
      },
    });
    //------------------------------------------------------------------
  }

  
   
}
