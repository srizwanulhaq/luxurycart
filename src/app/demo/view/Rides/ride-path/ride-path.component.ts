import { Component, Input, OnInit } from '@angular/core';
import { Ridedao } from 'src/app/demo/domain/Dao/Rides/Ridedao';
import { RidePath } from 'src/app/demo/domain/Dao/Rides/RidePath';
import { RideService } from 'src/app/demo/service/rideservice';

@Component({
  selector: 'app-ride-path',
  templateUrl: './ride-path.component.html',
  styleUrls: ['./ride-path.component.scss']
})
export class RidePathComponent implements OnInit {

  private _details:Ridedao;
  historydto: RidePath;

  start_end_mark = [];
  latlng: any;
  latlng2: any;
  lat: any = 0;
  lng: any = 0;

  constructor(private service:RideService) { }

  ngOnInit(): void {
  }

  @Input() 
  set details(value: Ridedao) {
    if (value) {
      this._details = value;
      this.ridePath();
    }
  }

  get details(): Ridedao {
    return this._details;
  }

  ridePath(){
    this.service.getRideVehicleHistory(this.details.id).subscribe(data => {
      this.historydto = data.historydto;
      console.log(this.historydto)
      this.generatePolyLines(this.historydto);
    });
 }

 generatePolyLines(trackingdto: RidePath) {
  if (trackingdto.lstPolygons.length > 0) {
    this.latlng = trackingdto.lstPolygons;
    this.lat = this.latlng[0].positionLatitude;
    this.lng = this.latlng[0].positionLongitude;
    this.start_end_mark = [] 
    this.start_end_mark.push(this.latlng[0]);
    this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
    
  }
  else if(trackingdto.lstPolygons2.length > 0){

    this.latlng2 = trackingdto.lstPolygons2;
    this.lat = this.latlng2[0].latitude;
    this.lng = this.latlng2[0].longitude;
    this.start_end_mark = [] 
    this.start_end_mark.push(this.latlng2[0]);
    this.start_end_mark.push(this.latlng2[this.latlng2.length - 1]);
  }
  else
    this.start_end_mark = [] ;
  
};
}
