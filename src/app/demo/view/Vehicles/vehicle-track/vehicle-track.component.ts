import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Vehicledao } from 'src/app/demo/domain/Dao/Vehicle/Vehicledao';
import { VehicleTrackingDao } from 'src/app/demo/domain/Dao/Vehicle/VehicleTrackingDao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';

@Component({
  selector: 'app-vehicle-track',
  templateUrl: './vehicle-track.component.html',
  styleUrls: ['./vehicle-track.component.scss']
})
export class VehicleTrackComponent implements OnInit {
 
  private _details:Vehicledao;
    //Vehicle Tracking
    intervals: SelectItem[];
    selectedVehicleInterval: number = 1;
    trackingdto: VehicleTrackingDao;
    start_end_mark = [];
    latlng: any;
    lat: any = 0;
    lng: any = 0;
    subscription: Subscription;
    loading = true;
  constructor(public main: VehicleMainComponent,
    private service: VehicleService,) { 
    this.loadIntervalsDrpDwn();
  }

  ngOnInit(): void {
  }
 
  @Input() 
  set details(value: Vehicledao) {
    if (value) {
        this.selectedVehicleInterval = 1;
        this._details = value;
        this.defaulvehicleTrack(this.selectedVehicleInterval,value.number)
      }
  }

  get details(): Vehicledao {
    return this._details;
  }
  loadIntervalsDrpDwn() {
    this.intervals = [];
    this.intervals.push({ label: 'Auto Update Last 10 min', value: 8 });
    this.intervals.push({ label: 'Last 10 min', value: 1 });
    this.intervals.push({ label: 'Last 30 min', value: 2 });
    this.intervals.push({ label: 'Last 1 hour', value: 3 });
    this.intervals.push({ label: 'Last 2 hours', value: 4 });
    this.intervals.push({ label: 'Last 6 hours', value: 5 });
    this.intervals.push({ label: 'Last 12 hours', value: 6 });
    this.intervals.push({ label: 'Last day', value: 7 });
  }
  onChange(event) {  
    this.loading = true;
    if (this.selectedVehicleInterval == 8) {
      this.subscription = timer(0, 600000).pipe(
        switchMap(() => this.service.getVehicleTracking(event.value, this.details.number.toString()))).subscribe(data => {
          this.trackingdto = data.trackingdto;
          this.generatePolyLines(this.trackingdto);
        });
    }
    else {
      this.service.getVehicleTracking(event.value, this.details.number.toString()).subscribe(data => {
        this.ngOnDestroy();
        this.trackingdto = data.trackingdto;
        this.generatePolyLines(this.trackingdto);
      });
    }
  }
  generatePolyLines(trackingdto: VehicleTrackingDao) {
    if (trackingdto.lstPolyLines.length != 0) {
      this.latlng = trackingdto.lstPolyLines;
      this.lat = this.latlng[0].positionLatitude;
      this.lng = this.latlng[0].positionLongitude;
      this.start_end_mark = [];
      this.start_end_mark.push(this.latlng[0]);
      this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
      this.loading = false;
    }
    else
    this.start_end_mark = [];
  };

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  defaulvehicleTrack(intervalStatus,Vehiclenumber){
    this.loading = true;
    this.service.getVehicleTracking(intervalStatus, Vehiclenumber.toString()).subscribe(data => {
      this.trackingdto = data.trackingdto;
      this.generatePolyLines(this.trackingdto);
    });

  }
}
