import {Component, Input, OnInit } from '@angular/core';
import { Vehicledao } from 'src/app/demo/domain/Dao/Vehicle/Vehicledao';
import { MapService } from 'src/app/demo/service/map.service';

@Component({
  selector: 'app-vehicle-current-status',
  templateUrl: './vehicle-current-status.component.html',
  styleUrls: ['./vehicle-current-status.component.scss']
})
export class VehicleCurrentStatusComponent implements OnInit {


  private _details:Vehicledao;
  vehicleInfo:any;
  loading = true;
  vehNo:any
  constructor(private _mapsService: MapService,
  ) { }

  ngOnInit(): void {
  }

  @Input() 
  set details(value: Vehicledao) {
    if (value) {
      this._details = value;
      this.vehNo = value.number;
      this.loading = true;
      this.loadVehicleInfo(value.number);
      
    }
  }


  get details(): Vehicledao {
    return this._details;
  }


  loadVehicleInfo(vehicleNumber:string)
  {
      setTimeout(( () => {
          this._mapsService.getVehicleStatus(vehicleNumber).subscribe(res => {
              this.vehicleInfo = res.data;
              if( this.vehicleInfo)
              this.loading = false;         
            })
      }
      ),1000)
   
  }

}
