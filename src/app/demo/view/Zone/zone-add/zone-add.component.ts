import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { first } from 'rxjs/operators';
import { WalletPackageDao } from 'src/app/demo/domain/Dao/WalletPackages/WalletPackageDao';
import { Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import { DefaultRideFareSetting, DefaultRideScrutinySettingsDto, NewZoneDao, RideFareSetting, RideScrutinySettingsDto, Zone_Coordinates, Zone_CoordinatesDao } from 'src/app/demo/domain/Dao/Zone/NewZoneDao';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZoneMainComponent } from '../zone-main/zone-main.component';
import { VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { SimpleProjectDao } from 'src/app/demo/domain/Dao/Projects/projects';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';
declare var google: any;

@Component({
  selector: 'app-zone-add',
  templateUrl: './zone-add.component.html',
  styleUrls: ['./zone-add.component.scss'],
  providers: [MessageService]
})
export class ZoneAddComponent implements OnInit {

  submitted: boolean;
  zoneDialog: boolean;
  btnloading: boolean;
  currentlat: number = 0;
  currentlng: number = 0;
  lstZoneTypes: SelectItem[] = [];
  lstRideTypes: SelectItem[] = [];
  lstCompanies: SelectItem[] = [];
  lstTemplates: SelectItem[] = [];
  lstWalletPackages :SelectItem[] = [];
  _lstWalletPackages : WalletPackageDao[];
  items: MenuItem[];
  zoneForm: any;
  zoneFare: RideFareSetting[];
  zoneCordinates: Zone_CoordinatesDao[];
  zonefare = [];
  pointList: { lat: number; lng: number }[] = [];
  selectedArea = 0;
  activeIndex = 0;
  edgeCount: number = 1;
  rideType: string;
  vehicaleCompany: string;
  scrutinyTemplate: string;
  lstCountries: SelectItem[] = [];
  lstCities: Citydao2[];
  getlstCities: Citydao2[];
  redzone: number;
  parkingzone: number;
  currentDate = new Date();
  segway_Throttle_Command: boolean = false;
  nearby_RedZone: boolean = false;
  rideEnd_within_zone: boolean = false;
  buttonDisable: boolean;
  latlng: any;
  allLstScrutinySettings:RideScrutinySettingsDto[];
  lstScrutinySettings1:  RideScrutinySettingsDto[];
  lstScrutinySettings2:  RideScrutinySettingsDto[];
  lstScrutinySettings3:  RideScrutinySettingsDto[];
  lstScrutinySettings4:  RideScrutinySettingsDto[];
  lstScrutinySettings5:  RideScrutinySettingsDto[];
  lstSettings = [];
  lstSettings1 = [];
  lstSettings2 = [];
  lstSettings3 = [];
  lstSettings4 = [];
  lstSettings5 = [];
  selectedTemplate: number;
  enable24Hours: boolean = false;
  sendCustomerNotification: boolean = false;
  sendAdminNotification: boolean = false;
  allowRideEnd: boolean = false;
  turnSpeedLow: boolean = false;
  turnThrottleOff: boolean = false;
  enable24: boolean = false;
  appliedDays: object = {
    1: 0,
    2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  };
  weeks: string[] = [
    "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"
  ]
  validatedays:string;
  vehicleType:VehicleTypeDropDown[];
  project:ProjectDropDown[];
  lstWalletPackageIds:string[];
  markers: marker[] = [
    {
      lat: 0,
      lng: 0,
      label: "A",
      draggable: true,
    },
  ];

  setcurrentlat:number;
  setcurrentlong:number;
  ridesItems:MenuItem[];
  activeRideIndex = 0;
  sequence1 = 1;
  sequence2 = 1;
  sequence3 = 1;
  sequence4 = 1;
  sequence5 = 1;
  itemsSpeedMode: any;
  defaultSpeed:number = 25;
  showDefaultSpeed: boolean;

  constructor(public main: ZoneMainComponent, private service: ZoneService,
    private _formBuilder: FormBuilder, private messageService: MessageService,
    private _PromoCodeService: PackagediscountService,private projectService:ProjectsService, 
    private cdref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setCurrentPosition();
    this.loadForm();
    this.loadDropdownCountry();
    //this.setDefaultSpeed()
  }
  @Output() eventChange = new EventEmitter<Event>();
  // setDefaultSpeed(){
  //   this.itemsSpeedMode = [
  //     { label: '10', value: 10 },
  //     { label: '15', value: 15 },
  //     { label: '25', value: 25 },
  // ];
  // }
  newZone() {
    this.activeIndex = 0;
    this.submitted = false;
    this.zoneDialog = true;
    this.main.event = null;
    this.getlstCities = null;
    this.redzone = null;
    this.buttonDisable = false;
    this.setOption();
    this.loadDropdownValues();
    this.setCurrentPosition();
    //this.setOptionForRides();

  }
  setOption() {
    this.items = [{
      label: 'Zone Information',
    },
    {
      label: 'Draw Zone',
    }
    ];

  }
  
 
  // ChangeZoneType(e) {
  //   if (e.value == '92914c73-f2f6-11ec-bcc3-065837c3e1de') {
  //     this.redzone = 3;
  //     this.items = [{
  //       label: 'Basic Details',
  //     },
  //     {
  //       label: 'Draw Zone',
  //     },
  //     ];
  //   }
  //   else {
  //     this.parkingzone = 1;
  //     this.redzone = null;
  //     this.setOption();
  //   }
  // }
  nextPage(e) {
    this.submitted = true;
    if(this.zoneForm.controls.title.value && this.zoneForm.controls.projectId && this.zoneForm.controls.vehicletypeId)
    {
      this.handleActiveIndex();
    }
    // if (this.zoneForm.value.title  &&
    //   this.zoneForm.value.zone_Type_Id && this.zoneForm.value.city_Id && this.zoneForm.value.country_Id) {

    //   switch (e) {
    //     case 3:
    //       this.skipSteps();
    //       break;
    //     default:
    //       this.handleActiveIndex();
    //       break;
    //   }
    // }
  }

  handleActiveIndex() {
    switch (this.activeIndex) {
      case 0:
        this.incrementActiveIndex();
        this.submitted = false;
        break;
      // case 1:
      //   if(this.zoneForm.value.title)
      //   {
      //     this.incrementActiveIndex();
      //     this.submitted = false;
      //   }
      //   break;
      // case 2:
      //   if (this.zoneForm.value.zone_Coordinates.length > 0 || this.zoneCordinates.length > 0) {
      //     this.incrementActiveIndex();
      //     this.submitted = false;
      //   }
      //   break;
      // case 3:
      //   this.zoneFare == undefined ? this.incrementActiveIndex() : this.zoneFare.length >= 0 ? this.incrementActiveIndex() : true;
      //   this.submitted = false;
      //   break;
    }
  }
  prevPage(e) {
    // if (e === 2) {
    //   this.activeIndex = this.activeIndex - 1;
    //   this.buttonDisable = false;
    // }
    // else
    //   this.decrementActiveIndex();
    this.activeIndex = this.activeIndex-1;
  }
  loadDropdownValues()
  {
    this.service.getProjectDropdowns().then(resp => {
      if (resp) {
          this.project = resp;
      }});
      this.service.getVehicleTypeDropdown().subscribe(resp => {
        if (resp.status) {
            this.vehicleType = resp.data;
        }});
  }
  // loadDropdownValues() {
  //   this.service.allDropDownResult().then(responseList => {
  //     this.lstZoneTypes = responseList.lstZoneTypes;
  //     this.lstRideTypes = responseList.lstRideTypes;
  //     this.lstCompanies = responseList.lstCompanies;
  //     this.lstTemplates = responseList.lstRideTemplates;
      
  //     this._lstWalletPackages = responseList.lstWalletPackages;
  //     var _itemWalletPackage: any = [];
  //     this._lstWalletPackages.forEach(function (item) {
  //       _itemWalletPackage.push({ name: (item.title + " " + "TopUp Amount" + " " + item.top_Up_Amount + " " + "Bonus Amount" + " "+ item.bonus_Amount), code: item.id });
  //     });
  //     this.lstWalletPackages = _itemWalletPackage;
  //   });
  // }
  // onVehicleTypeSelection(event)
  // {
  //   this.showDefaultSpeed=true;
  //   let maxSpeed = 15;
  //   event.value.forEach(selectedType => {
  //   let type = this.vehicleType.find(type => type.value === selectedType);
  //   if (type && type.maxSpeed > maxSpeed) {
  //       maxSpeed = type.maxSpeed;
  //   }
  // });
  //   this.zoneForm.controls.default_Speed.setValidators([Validators.min(10),
  //     Validators.max(maxSpeed)]);
  // }
  loadForm() {
    this.zoneForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      arTitle: [],
      vehicletypeId:[[],[Validators.required]],
      projectId:["",[Validators.required]],
      default_Speed:[0,[Validators.required]],
      center_Latitude: [''],
      center_Longitude: [''],
      zone_Coordinates: this._formBuilder.array([]),
      city_Id: ['', [Validators.required]],
      country_Id: ['', [Validators.required]],
      setcurrentlat:[],
      setcurrentlong:[],

    });
  }




  // removeSetting(i,rideIndex) {
    
  //   if(rideIndex == 0){
  //     this.lstScrutinySettings1.forEach((element, index) => {
  //       if (index == i)
  //         this.lstScrutinySettings1.splice(index, 1);
  //     });
  //   }
  //   if(rideIndex == 1){
  //     this.lstScrutinySettings2.forEach((element, index) => {
  //       if (index == i)
  //         this.lstScrutinySettings2.splice(index, 1);
  //     });
  //   }
  //   if(rideIndex == 2){
  //     this.lstScrutinySettings3.forEach((element, index) => {
  //       if (index == i)
  //         this.lstScrutinySettings3.splice(index, 1);
  //     });
  //   }
  //   if(rideIndex == 3){
  //     this.lstScrutinySettings4.forEach((element, index) => {
  //       if (index == i)
  //         this.lstScrutinySettings4.splice(index, 1);
  //     });
      
  //   }
  //   if(rideIndex == 4){
  //     this.lstScrutinySettings5.forEach((element, index) => {
  //       if (index == i)
  //         this.lstScrutinySettings5.splice(index, 1);
  //     }); 
  //   }
  // }


  onSubmitForm() {

    this.submitted = true;
    console.log(this.zoneForm.value)
    this.addNewZone(this.zoneForm.value)

  }

  addNewZone(zone: NewZoneDao) {
    this.service.saveZone(zone).pipe(first())
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.zoneDialog = false;
          //this.zoneFare = null;
          //this.allLstScrutinySettings = null;
          if (response.status) {
            this.eventChange.emit(response.status);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          } else {
            this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
          }
        },
        error: (error) => {
          this.btnloading = false;
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
        },
      });
  }

  resetForm() {
    this.zoneForm.reset();
    this.btnloading = false;
  }

//   setValue() {
//     if (this.redzone == 3) {
//       this.zoneForm.value.ride_fare_setting = null;
//       this.zoneForm.value.ride_scrutiny_setting = null;
//       this.zoneForm.value.min_Wallet_Balance = 0;
//       this.zoneForm.value.default_Speed = 0;
//       this.zoneForm.value.nearby_RedZone = false;
//       this.zoneForm.value.segway_Throttle_Command = false;
//       this.zoneForm.value.rideEnd_within_zone = false;
//       this.zoneForm.value.zone_Start_Time = this.currentDate;
//       this.zoneForm.value.zone_End_Time = this.currentDate;
//       this.zoneForm.value.zone_Coordinates = this.zoneCordinates;
//       if (this.zoneForm.value.zone_Coordinates.length > 0) {
//         this.submitted = false;
//       }
//     }
//     else {

//       if(this.allLstScrutinySettings != null)
//         this.zoneForm.value.ride_scrutiny_setting = this.allLstScrutinySettings;
//       else
//       this.setDefaultScrutiny();

//       if(this.zoneFare != null)
//         this.zoneForm.value.ride_fare_setting = this.zoneFare;
//       else
//         this.setDefaultFare();

// //      this.setPackageIds();
//       this.zoneForm.value.walletPackagesIds = this.lstWalletPackageIds;
//       this.zoneForm.value.default_Speed = this.defaultSpeed;
//     }
//     this.zoneForm.value.zone_Coordinates = this.zoneCordinates;
//     this.zoneForm.value.center_Latitude = parseFloat(this.latlng.toString().replace("(", "").replace(")", "").split(",")[0]);
//     this.zoneForm.value.center_Longitude = parseFloat(this.latlng.toString().replace("(", "").replace(")", "").split(",")[1].replace(" ", ""));
//   }
//   setDefaultScrutiny(){
//     const defaultRideScrutiny:  DefaultRideScrutinySettingsDto[] = [
//       {
//           templateId: 1, 
//           totalLeftMinutes: 10,  
//           no_Of_Rides: 1, 
//           Sequence:1,
//           startTime: '12:00',     
//           endTime: '12:00',       
//           appliedDays: '1111111',  
//           enable24Hours: true, 
//           sendCustomerNotification: true,  
//           sendAdminNotification: true,     
//           allowRideEnd: false,   
//           turnSpeedLow: false,     
//           turnThrottleOff: false, 
             
//       },
//       {
//           templateId: 1, 
//           totalLeftMinutes: 0,  
//           no_Of_Rides: 1, 
//           Sequence:2,
//           enable24Hours: true,    
//           startTime: '12:00',     
//           endTime: '12:00',       
//           appliedDays: '1111111',   
//           sendCustomerNotification: true,  
//           sendAdminNotification: true,     
//           allowRideEnd: false,   
//           turnSpeedLow: false,     
//           turnThrottleOff: false, 
              
//       },
//       {
//           templateId: 1, 
//           totalLeftMinutes: -10,  
//           no_Of_Rides: 1, 
//           Sequence:3,
//           enable24Hours: true,    
//           startTime: '12:00',     
//           endTime: '12:00',       
//           appliedDays: '1111111',   
//           sendCustomerNotification: true,  
//           sendAdminNotification: true,     
//           allowRideEnd: true,   
//           turnSpeedLow: true,     
//           turnThrottleOff: true, 
              
//       },
//   ];
  
//   this.zoneForm.value.ride_scrutiny_setting = defaultRideScrutiny;


//   }
//   setDefaultFare(){
//     const defaultRideFareSetting:  DefaultRideFareSetting[] = [
//       {
//         rideTypeId:"78efe9d1-d4e7-11eb-b76d-3863bb70fb03", //single
//         vehicleCompanyId:"9ab9727d-1a37-11ed-9d6d-065837c3e1de",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"78efe9d1-d4e7-11eb-b76d-3863bb70fb03", //single
//         vehicleCompanyId:"a880d9c0-d1eb-11ec-ad19-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"78efe9d1-d4e7-11eb-b76d-3863bb70fb03", //single
//         vehicleCompanyId:"4096fa5a-dd86-11eb-b76d-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"78efe9d1-d4e7-11eb-b76d-3863bb70fb03", //single
//         vehicleCompanyId:"47b6fc0d-92d0-11eb-938d-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"82efc2c0-d4e7-11eb-b76d-3863bb70fb03", //group
//         vehicleCompanyId:"9ab9727d-1a37-11ed-9d6d-065837c3e1de",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"82efc2c0-d4e7-11eb-b76d-3863bb70fb03", //group
//         vehicleCompanyId:"a880d9c0-d1eb-11ec-ad19-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"82efc2c0-d4e7-11eb-b76d-3863bb70fb03", //group
//         vehicleCompanyId:"4096fa5a-dd86-11eb-b76d-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },
//       {
//         rideTypeId:"82efc2c0-d4e7-11eb-b76d-3863bb70fb03", //group
//         vehicleCompanyId:"47b6fc0d-92d0-11eb-938d-3863bb70fb03",
//         fixed_Start_Price:0,
//         time_Price:1,
//         price_Per_Kilometer:0,
//         paused_Time_Price:0,
             
//       },

//   ];
//     this.zoneForm.value.ride_fare_setting = defaultRideFareSetting;
//   }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentlat = position.coords.latitude;
        this.currentlng = position.coords.longitude;

        this.setcurrentlat = this.currentlat;
        this.setcurrentlong = this.currentlng;

     
      });
    }
  }

  setCoordinates() {
    var bounds = new google.maps.LatLngBounds();
    if (this.pointList.length > 0) {
      var lstzoneCoordinates = [];
      this.pointList.forEach(function (item_lat_lng, index) {
        lstzoneCoordinates.push({ latitude: item_lat_lng.lat, longitude: item_lat_lng.lng, sequence: index + 1 });
      });
    }
    lstzoneCoordinates.push({ latitude: this.pointList[0].lat, longitude: this.pointList[0].lng, sequence: this.pointList.length + 1 });
    for (var i = 0; i < this.pointList.length; i++) {
      bounds.extend(this.pointList[i]);
    }
    // The Center of the polygon
    this.latlng = bounds.getCenter();
    if (
      lstzoneCoordinates[0].latitude === lstzoneCoordinates[lstzoneCoordinates.length - 1].latitude &&
      lstzoneCoordinates[0].longitude === lstzoneCoordinates[lstzoneCoordinates.length - 1].longitude
    ) {
    
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: '', life: 3000 });
    } else 
      this.messageService.add({ severity: 'warning', summary: 'Failed', detail:'Wrong polygone', life: 3000 });
    
    this.zoneCordinates = lstzoneCoordinates;
    this.zoneForm.value.zone_Coordinates = this.zoneCordinates;
    this.zoneForm.value.center_Latitude = parseFloat(this.latlng.toString().replace("(", "").replace(")", "").split(",")[0]);
    this.zoneForm.value.center_Longitude = parseFloat(this.latlng.toString().replace("(", "").replace(")", "").split(",")[1].replace(" ", ""));
 
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  setWeekDays(week: string) {
    return week.split(/([0-9])/).filter(w => w != "").map((w: string, i: number) => {
      if (parseInt(w) == 1) {
        return this.weeks[i];
      } return ""
    }).filter(w => w).join(", ")
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };


    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete',
      (event) => {       // Polygon drawn       
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          this.updatePointList(event.overlay.getPath());
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          drawingManager.setDrawingMode(null);
          // To hide:
          drawingManager.setOptions({
            drawingControl: false,
          });
        }
      });
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    this.setCoordinates();
  }

  rideTypeName(rideType: Dropdown) {
    this.rideType = rideType.selectedOption.label;
  }
  scrutinyTemplateName(scrutinyTemplate: Dropdown) {
    this.scrutinyTemplate = scrutinyTemplate.selectedOption.label;
  }

  companyName(company: Dropdown) {
    this.vehicaleCompany = company.selectedOption.label;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}
  loadDropdownCountry() {
    //load counties
    this.projectService.getCityCountryDropdown().then(responseList => {
      this.lstCountries = responseList.countrylist;
      this.lstCities = responseList.citylist;
    });
  }

  onSelect(e) {
      this.getlstCities = this.lstCities.filter(z => z.country_Id == e.value);
  }

  onRemovePolygon() {
    this.zoneCordinates = [];
    this.pointList = [];

  }

  incrementActiveIndex() {
    this.activeIndex = this.activeIndex + 1;
  }

  decrementActiveIndex() {
    this.activeIndex = this.activeIndex - 1;
  }

  skipSteps() {
    this.submitted = false;
    this.activeIndex = this.activeIndex + 2;
    this.buttonDisable = true;
  }
  myModelChanged(e, i) {
    this.appliedDays[i] = !e.checked[0] && !!this.appliedDays[i] ? 0 : 1
  }

  // setPackageIds(){
  //   var lstPackageIds = [];
  //   this.zoneForm.value.walletPackagesIds != null ?  this.zoneForm.value.walletPackagesIds.forEach(Package =>  {
  //     lstPackageIds.push(Package.code);
  //   }) : this.defaultPackages.forEach(Package =>  {
  //        lstPackageIds.push(Package)
  //   });
      
  //   this.lstWalletPackageIds = lstPackageIds;
  // }

  onUpdateMapPointer() {
    this.markers = [];
    this.markers.push({
      lat: this.setcurrentlat,
      lng: this.setcurrentlong,
      draggable: true,
    });
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  speedMode(event) {
    this.defaultSpeed = event.value
}

}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
