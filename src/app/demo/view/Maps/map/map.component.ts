
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription,interval } from 'rxjs';
import { MapsDao, Vehicles } from 'src/app/demo/domain/Dao/Maps/map-dao';
import { MapService } from 'src/app/demo/service/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DatePipe,MessageService],
})
export class MapComponent implements OnInit,OnDestroy   {

  VehicleInfo:any;
  mapsDao: MapsDao;
  parkingZone:any = [];
  vehicles:Vehicles[];
  progressSpinner: boolean = false;
  zoom: number = 8;
  black:string = "black";
  originLocation: string = window.location.origin;
  markerRed:string = `${this.originLocation}/assets/img/map-marker/marker_red1.png`;
  markerGreen:string = `${this.originLocation}/assets/img/map-marker/marker_green1.png`;
  markerYellow:string = `${this.originLocation}/assets/img/map-marker/marker_yellow1.png`;
  markerBlue:string = `${this.originLocation}/assets/img/map-marker/marker_blue1.png`;
  markerBrown:string = `${this.originLocation}/assets/img/map-marker/marker_brown1.png`;
  markerPurple:string = `${this.originLocation}/assets/img/map-marker/marker_purple1.png`;
  markerOrange:string = `${this.originLocation}/assets/img/map-marker/marker_orange1.png`;

  markerFull:string = `${this.originLocation}/assets/img/map-marker/marker_icon_full.png`;
  markerHalf:string = `${this.originLocation}/assets/img/map-marker/marker_icon_half.png`;
  markerLow:string = `${this.originLocation}/assets/img/map-marker/marker_icon_low.png`;
  markerGreen2:string = `${this.originLocation}/assets/img/map-marker/markerGreen.png`;
  currentUserName:string;
  lat: number = 0;
  lng: number = 0;
  scroll: boolean = false;
  refreshInterval = 60000; // Refresh interval in milliseconds (e.g., every one minute)
  private timerSubscription: Subscription;
  greenStrokeColor = 'green';
  redStrokeColor = 'red';
  vehicleOnline:any;
  mapName:any;
  signalStrength:any;
  zoneStats:any;
  totalRides:number;
  revenue:number;
  selectedFilter: number = 0
  startDate: string = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
  endDate: string = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
  currentZoneId:any;
  showFilter:boolean = false;
  _startDate:Date;
  _endDate:Date;
 
  constructor(
    private _mapsService: MapService,
    private datepipe: DatePipe,
    private messageService:MessageService
  ) { 
    this.currentUserName = localStorage.getItem("userName");
  }

  ngOnInit(): void {
    this.getAllMaps();
    this.timerSubscription = interval(this.refreshInterval).subscribe(() => {
      this.getAllMaps();
    });
  }
 
  @Input()
  set event(event: Event) {
    if (event) {
      this.getAllMaps();
    }
  }
  clickedMarker(vehicle: any) {
    this.loadVehicleStats(vehicle)
  }
  loadVehicleStats(vehicle:any){
    this._mapsService.getVehicleStatus(vehicle.number).subscribe(res => { 
      if(res.data.segwayStatus != null){
        this.signalStrength = res.data.segwayStatus.data.networkSignal
        this.vehicleOnline  = res.data.segwayStatus.data.online == true ?  "Online"  : "Offline";
     
      }
      else if(res.data.omni != null){
        this.signalStrength = res.data.omni.result[0].telemetry.gsmsignallevel.value;
        this.vehicleOnline  = "none"
      }
      else{
        this.signalStrength = "none"
        this.vehicleOnline  = "none"
      }
    })
  }
  loadZoneStats(){
    this.progressSpinner = true;
    this._mapsService.getZoneStats(this.selectedFilter + 1, this.currentZoneId, !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : "")
    .subscribe(res => {
      this.zoneStats = res.data;
      this.totalRides = res.data.totalRides;
      this.revenue = res.data.totalWalletRevenue;
      this.progressSpinner =  false; 
 })


  }
  mapFilter(e){
    this.selectedFilter = e
    if (e == 0) {
        this.startDate = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
        this.endDate = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
        this.loadZoneStats();
    } else if (e == 1) {
        this.startDate = this.setDateFormat(new Date(new Date((new Date()).setDate((new Date()).getDate() - 1)).setHours(0, 0, 0, 0)))
        this.endDate = this.setDateFormat(new Date(new Date((new Date()).setDate((new Date()).getDate() - 1)).setHours(23, 59, 59, 59)))
        this.loadZoneStats();
    } else if (e == 2) {
        this.startDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1).setHours(0, 0, 0, 0)))
        this.endDate = this.setDateFormat(new Date(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).setHours(23, 59, 59, 59)))
        this.loadZoneStats();
    } else if (e == 4) {
        this.startDate = ""
        this.endDate = ""
        this.loadZoneStats();
    }
     else if (e == 3) {
        this.startDate = ""
        this.endDate = ""
        
    }
  }
  mapClicked(zoneId: any,zones:any[],index: number) {
    let parkingZones =  zones.filter(x => x.zone_Type.number  == 1 && x.id == zoneId);
    if(parkingZones.length > 0){
      this.currentZoneId = parkingZones[0].id;
      this.loadZoneStats();
      this.mapName = parkingZones[0].title;
      this.showFilter = true
    }
    else{
      this.showFilter = false
      this.zoneStats =   null 
      this.reset();
      let parking =  zones.filter(x => x.id == zoneId);
      const errorMessage = `This is ${parking[0].title}`
      this.messageService.add({severity: 'error', summary: 'Message', detail: errorMessage, life: 3000});
    
   }
    
  }
 markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  ngOnDestroy() {
    // Unsubscribe from the timer to prevent memory leaks
    this.timerSubscription.unsubscribe();
  }
  getAllMaps() {
    this.progressSpinner = true
    this._mapsService.getAllMaps().subscribe(response => {
      this.mapsDao = response.mapsto;
      this.parkingZone = this.mapsDao.parking_Zones;
      this.parkingZone = this.parkingZone.filter(x => x.zone_Type.number != 0)
      this.vehicles = this.mapsDao.vehicles;
      this.vehicles.forEach(veh => {
        veh.vehicle_Status.iconUrl = veh.vehicle_Status.number == 1 ? this.markerGreen : 
        veh.vehicle_Status.number == 2 ? this.markerBlue : 
        veh.vehicle_Status.number == 3 ? this.markerPurple :
        veh.vehicle_Status.number == 4 ? this.markerBrown :
        veh.vehicle_Status.number == 5 ? this.markerYellow :
        veh.vehicle_Status.number == 6 ? this.markerOrange : this.markerRed; 
      });

      this.lat = this.parkingZone[0].center_Latitude;
      this.lng = this.parkingZone[0].center_Longitude;
      if (this.mapsDao) {
        this.progressSpinner = false;
      }
      //------for drop down demo end----

    });
  }

  setDateFormat(date: Date): string {
    return this.datepipe.transform(date, "yyyy-MM-dd HH:mm:00")
}
onDateChange(data) {
  this[`${data.type}Date`] = data.date
}

onRangeChange(reset) {
  if (reset) {
      this.selectedFilter = 0
      this.startDate = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
      this.endDate = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
  }
  this.loadZoneStats()
}

onDateSelect(date: Date, type: string) {
  this.selectedFilter = 0
  if(type == 'start')
  this.startDate = this.setDateFormat(new Date((new Date().getFullYear(),date).setHours(0, 0, 0, 0)))
  else
  this.endDate = this.setDateFormat(new Date((new Date().getFullYear(),date).setHours(23, 59, 59, 59)))
  
  if (!!this.startDate && type == 'end' ) {
      
    this.loadZoneStats()
  
    }
}
   reset(){
    this.selectedFilter = 0
    this.startDate = this.setDateFormat(new Date((new Date()).setHours(0, 0, 0, 0)))
    this.endDate = this.setDateFormat(new Date((new Date()).setHours(23, 59, 59, 59)))
   }
  mapReset(){
  this.reset();
  this.loadZoneStats()
  this._endDate = new Date();
  this._startDate = new Date();

  }
}




interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  visible: boolean;
  opacity: number;
  iconUrl: string;
}
