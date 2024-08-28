import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { first } from 'rxjs/operators';
import { Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import { EditZoneDao, RideFareSetting, RideScrutinySettings, Zone_CoordinatesDao, Zone_CoordinatesDao2 } from 'src/app/demo/domain/Dao/Zone/EditZoneDao';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZoneMainComponent } from '../zone-main/zone-main.component';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';
import { DriveModeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
declare var google: any;
@Component({
    selector: 'app-zone-edit',
    templateUrl: './zone-edit.component.html',
    styleUrls: ['./zone-edit.component.scss'],
    providers: [MessageService, DatePipe]
})
export class ZoneEditComponent implements OnInit {

    @Input() editzoneData: EditZoneDao;

    activeIndex = 0;
    items: MenuItem[];    
    ridesItems: MenuItem[];
    zoneEditForm: any;
    btnloading: boolean;
    lstZoneTypes: SelectItem[] = [];
    lstRideTypes: SelectItem[] = [];
    lstCompanies: SelectItem[] = [];
    lstTemplates: SelectItem[] = [];
    pointList: { lat: number; lng: number }[] = [];
    edgeCount: number = 1;
    select_zone_Start_Time: Date;
    select_zone_End_Time: Date;
    zoneFare: RideFareSetting[];
    currentlat: number = 0;
    currentlng: number = 0;
    zoneCordinates: Zone_CoordinatesDao[];
    zoneCordinates2: Zone_CoordinatesDao2[];
    selectedArea = 0;
    drawingManager: any;
    selectedShape: any;
    zonefare = [];
    rideTypName: string;
    vehicaleCompany: string;
    scrutinyTemplate: string;
    lstCountries: SelectItem[] = [];
    lstCities: Citydao2[];
    getlstCities: Citydao2[];
    redzone: number;
    zonetype: boolean = true;
    buttonDisable: boolean;
    submitted: boolean;
    lstScrutinySettings: RideScrutinySettings[];
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
    getTotalLeftMinutes: number;
    getStartTime: string;
    templateId: number;
    buttonLable = "Add";
    getindex: number;
    getId: string;
    lstWalletPackages :SelectItem[] = [];
    selectedLstPackages : any[];
    _lstWalletPackages : any[];
    lstWalletPackageIds:string[];

  allLstScrutinySettings: RideScrutinySettings[];
  lstScrutinySettings1: RideScrutinySettings[];
  lstScrutinySettings2: RideScrutinySettings[];
  lstScrutinySettings3: RideScrutinySettings[];
  lstScrutinySettings4: RideScrutinySettings[];
  lstScrutinySettings5: RideScrutinySettings[];
  driveModeDropDown:DriveModeDropDown[];
    sequence1 = 1;
    sequence2 = 1;
    sequence3 = 1;
    sequence4 = 1;
    sequence5 = 1;
    activeRideIndex = 0;
    defaultPackages: string[] = [
        "47d52594-5f9d-11eb-a38d-3863bb70fb03",
        "549a01e2-5f9d-11eb-a38d-3863bb70fb03",
        "5d1e41db-5f9d-11eb-a38d-3863bb70fb03",
      ]
      itemsSpeedMode: any;
      defaultSpeed:number;
    project: ProjectDropDown[];
    vehicleType: any;
    showDefaultSpeed: boolean;
    constructor(public main: ZoneMainComponent, private service: ZoneService,
        private _formBuilder: FormBuilder, private messageService: MessageService, private datePipe: DatePipe,
        private _PromoCodeService: PackagediscountService,private projectService:ProjectsService,
    private cdref:ChangeDetectorRef) { }

    ngOnInit(): void {
        this.setOption();
        //this.setOptionForRides();
        this.loadForm();
        this.loadDropdownValues();
        this.setCurrentPosition();
        this.loadDropdownCountry();
        this.loadDropDown();
        //this.setDefaultSpeed();
    }

    @Output() eventChange = new EventEmitter<Event>();
    // setDefaultSpeed(){
    //     this.itemsSpeedMode = [
    //       { label: '10', value: 10 },
    //       { label: '15', value: 15 },
    //       { label: '25', value: 25 },
    //   ];
    //   }
    setOption() {
        this.items = [{
            label: 'Zone Information',
        },
        {
            label: 'Draw Zone',
        }
        ];
    }
    // setOptionForRides() {
    //     this.ridesItems = [{
    //       label: 'ride 1',
    //     },
    //     {
    //       label: 'ride 2',
    //     },
    //     {
    //       label: 'ride 3',
    //     },
    //     {
    //       label: 'ride 4',
    //     },
    //     {
    //       label: 'ride 5',
    //     },
    //     ];
    
    //   }
    nextPage(e) {
        this.submitted = true;
        if(this.zoneEditForm.controls.title.value && this.zoneEditForm.controls.projectId && this.zoneEditForm.controls.vehicletypeId)
        {
          this.activeIndex=this.activeIndex+1;
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
    
    prevPage(e) {
        if (e === 3) {
            this.activeIndex = this.activeIndex - 2;
            this.buttonDisable = false;
        }
        else
            this.activeIndex = this.activeIndex - 1;
    }
    loadDropdownValues()
    {
    this.service.getProjectDropdowns().then(resp => {
      if (resp) {
          this.project = resp;
      }});
    //   this.service.getVehicleTypeDropdown().subscribe(resp => {
    //     if (resp.status) {
    //         this.vehicleType = resp.data;
    //     }});
  }
  onProjectSelection(event)
  {
    this.service.getVehicleTypeDropdownbyId(event.value).subscribe(resp => {
      if (resp.status) {
          this.vehicleType = resp.data;
      }});
  }
  loadDropdownCountry() {
    //load counties
    this.projectService.getCityCountryDropdown().then(responseList => {
      this.lstCountries = responseList.countrylist;
      this.lstCities = responseList.citylist;
    });
  }
  loadDropDown()
  {
      debugger;
      this.service.loadDropDown().subscribe(resp => {
              if (resp.status) {
                  this.driveModeDropDown = resp.data
              }
          })
  }
 
    // loadDropdownValues() {
    //     this.service.allDropDownResult().then(responseList => {
    //         this.lstZoneTypes = responseList.lstZoneTypes;
    //         this.lstRideTypes = responseList.lstRideTypes;
    //         this.lstCompanies = responseList.lstCompanies;
    //         this.lstTemplates = responseList.lstRideTemplates;


    //         this._lstWalletPackages = responseList.lstWalletPackages;
    //         var _itemWalletPackage: any = [];
    //         this._lstWalletPackages.forEach(function (item) {
    //           _itemWalletPackage.push({ name: (item.title + " " + "TopUp Amount" + " " + item.top_Up_Amount + " " + "Bonus Amount" + " "+ item.bonus_Amount), code: item.id });
    //         });
    //         this.lstWalletPackages = _itemWalletPackage;
        
    //     });
    // }
    ngOnChanges(change: SimpleChange) {
        debugger;
        if (!!change['editzoneData'].currentValue) {
            const temp = change['editzoneData'].currentValue;
            let maxSpeed=15;
            // this.select_zone_Start_Time = new Date(temp.zone_Start_Time);
            // this.select_zone_End_Time = new Date(temp.zone_End_Time);
            const group: FormGroup = this.zoneEditForm as FormGroup;
            group.controls['id'].setValue(temp.id || "");
            group.controls['title'].setValue(temp.title || "");
            group.controls['drive_Mode_Id'].setValue(temp.drive_Mode_Id || "");
            group.controls['default_Speed'].setValue(temp.default_Speed || 0);
            this.service.getVehicleTypeDropdownbyId(temp.projects.id).subscribe(resp => {
                if (resp.status) {
                    this.vehicleType = resp.data;
                }});
            if (temp.vehicle_Types && temp.vehicle_Types.length > 0) 
            {
                const vehicleTypeIds = temp.vehicle_Types.map(element => element.id);
                group.controls['vehicletypeId'].setValue(vehicleTypeIds);
            //     vehicleTypeIds.forEach(selectedType => {
            //         let type = this.vehicleType.find(type => type.value === selectedType);
            //         if (type && type.maxSpeed > maxSpeed) {
            //             maxSpeed = type.maxSpeed;
            //         }
            //       });
            //       this.zoneEditForm.controls.default_Speed.setValidators([Validators.min(10),
            //         Validators.max(maxSpeed)]);
                
            // group.controls['default_Speed'].setValue(temp.default_Speed || maxSpeed || 0);
            } 
            else 
            {
                group.controls['vehicletypeId'].setValue([]);
            }
            
            group.controls['projectId'].setValue(temp.projects.id || "");
            
            group.controls['title'].setValue(temp.title || "");
            group.controls['arTitle'].setValue(temp.arTitle || "");
            // group.controls['zone_Type_Id'].setValue(temp.zone_Type.id || "");
            // group.controls['min_Wallet_Balance'].setValue(temp.min_Wallet_Balance || 0);
            // group.controls['default_Speed'].setValue(temp.default_Speed || 0);
            // group.controls['rideEnd_WithIn_Zone'].setValue(temp.rideEnd_WithIn_Zone);
            // group.controls['nearby_RedZone'].setValue(temp.nearby_RedZone);
            // group.controls['segway_Throttle_Command'].setValue(temp.segway_Throttle_Command);
            // this.defaultSpeed = temp.default_Speed;
            // this.zoneFare = temp.ride_Fare_SettingList;
            // this.lstScrutinySettings = temp.ride_Scrutiny_SettingList;
            // this.allLstScrutinySettings = temp.ride_Scrutiny_SettingList;
            // this.lstScrutinySettings1 = temp.ride_Scrutiny_SettingList.filter(x => x.no_Of_Rides == 1);
            // this.lstScrutinySettings2 = temp.ride_Scrutiny_SettingList.filter(x => x.no_Of_Rides == 2);
            // this.lstScrutinySettings3 = temp.ride_Scrutiny_SettingList.filter(x => x.no_Of_Rides == 3);
            // this.lstScrutinySettings4 = temp.ride_Scrutiny_SettingList.filter(x => x.no_Of_Rides == 4);
            // this.lstScrutinySettings5 = temp.ride_Scrutiny_SettingList.filter(x => x.no_Of_Rides == 5);
     
            
            this.currentlat = temp.center_Latitude;
            this.currentlng = temp.center_Longitude;
            this.zoneCordinates = temp.zone_Coordinates;
            var lstzoneCoordinates = [];
            temp.zone_Coordinates.forEach(function (item_lat_lng, index) {
                lstzoneCoordinates.push({ lat: item_lat_lng.lat, lng: item_lat_lng.lng, sequence: index + 1 });
            });
            this.zoneCordinates2 = lstzoneCoordinates;

            //this.redzone = temp.zone_Type.number;
            //thiis.activeIndex = 0;
            this.setStepForm();
            group.controls['country_Id'].setValue(temp.city.country.id || " ");
            group.controls['city_Id'].setValue(temp.city.id || " ");
            this.setCities(temp.city.country.id);

            var _itemWalletPackage: any = [];
        //     temp.zone_PackagesList.forEach(function (item) {
        //      _itemWalletPackage.push({ name: (item.wallet_Packages.title + " " + "TopUp Amount" + " " + item.wallet_Packages.top_Up_Amount + " " + "Bonus Amount" + " "+ item.wallet_Packages.bonus_Amount), code: item.wallet_Packages.id });
        //    });
      
            //this.selectedLstPackages  = _itemWalletPackage;
   


        }
    }
//     onVehicleTypeSelection(event)
//   {
//     this.showDefaultSpeed=true;
//     let maxSpeed = 15;
//     event.value.forEach(selectedType => {
//     let type = this.vehicleType.find(type => type.value === selectedType);
//     if (type && type.maxSpeed > maxSpeed) {
//         maxSpeed = type.maxSpeed;
//     }
//   });
//     this.zoneEditForm.controls.default_Speed.setValidators([Validators.min(10),
//       Validators.max(maxSpeed)]);
//   }
    setStepForm() {
        if (this.redzone == 3) {
            this.items = [{
                label: 'Zone Details',
            },
            {
                label: 'Draw Zone',
            },
            ];
        }
        else {
            this.redzone = null;
            this.setOption();
        }
    }
    loadForm() {
        this.zoneEditForm = this._formBuilder.group({

            id: [''],
            title: ['', [Validators.required]],
            arTitle: [],
            vehicletypeId:[[],[Validators.required]],
            projectId:["",[Validators.required]],
            center_Latitude: [''],
            center_Longitude: [''],
            zone_Coordinates: this._formBuilder.array([]),
            city_Id: ['', [Validators.required]],
            country_Id: ['', [Validators.required]],
            default_Speed:[0],
            drive_Mode_Id: ['', [Validators.required]]
           
        });
        // this.ride_fare_setting().push(this.newfare());
       
        // this.ride_scrutiny_setting().push(this.newSettings());
        // this.ride_scrutiny_setting2().push(this.newSettings2());
        // this.ride_scrutiny_setting3().push(this.newSettings3());
        // this.ride_scrutiny_setting4().push(this.newSettings4());
        // this.ride_scrutiny_setting5().push(this.newSettings5());
    }

    // ride_scrutiny_setting(): FormArray {
    //     return this.zoneEditForm.get("ride_scrutiny_setting") as FormArray
    // }
    // ride_scrutiny_setting2(): FormArray {
    //     return this.zoneEditForm.get("ride_scrutiny_setting2") as FormArray
    // }
    // ride_scrutiny_setting3(): FormArray {
    //     return this.zoneEditForm.get("ride_scrutiny_setting3") as FormArray
    // }
    // ride_scrutiny_setting4(): FormArray {
    //     return this.zoneEditForm.get("ride_scrutiny_setting4") as FormArray
    // }
    // ride_scrutiny_setting5(): FormArray {
    //     return this.zoneEditForm.get("ride_scrutiny_setting5") as FormArray
    // }
    // ride_fare_setting(): FormArray {
    //     return this.zoneEditForm.get("ride_fare_setting") as FormArray
    // }

    // newfare(): FormGroup {
    //     return this._formBuilder.group({
    //         rideTypeId: [''],
    //         vehicleCompanyId: [''],
    //         fixed_Start_Price: [''],
    //         time_Price: [''],
    //         price_Per_Kilometer: [''],
    //         rideType: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         vehicleCompany: this._formBuilder.control({
    //             id: [''],
    //             name: ['']
    //         }),
    //     })
    // }

    // newSettings(): FormGroup {
    //     return this._formBuilder.group({
    //         id: [],
    //         templateId: [''],
    //         ride_Scrutiny_Templates: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         totalLeftMinutes: [''],
    //         enable24Hours: [''],
    //         startTime: [''],
    //         endTime: [''],
    //         appliedDays: [''],
    //         sendCustomerNotification: [],
    //         sendAdminNotification: [],
    //         allowRideEnd: [],
    //         turnSpeedLow: [],
    //         turnThrottleOff: [],
    //         no_Of_Rides:[],
    //         sequence:[],
    //     })
    // }
    // newSettings2(): FormGroup {
    //     return this._formBuilder.group({
    //         id: [],
    //         templateId: [''],
    //         ride_Scrutiny_Templates: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         totalLeftMinutes: [''],
    //         enable24Hours: [''],
    //         startTime: [''],
    //         endTime: [''],
    //         appliedDays: [''],
    //         sendCustomerNotification: [],
    //         sendAdminNotification: [],
    //         allowRideEnd: [],
    //         turnSpeedLow: [],
    //         turnThrottleOff: [],
    //         no_Of_Rides:[],
    //         sequence:[],
    //     })
    // }
    // newSettings3(): FormGroup {
    //     return this._formBuilder.group({
    //         id: [],
    //         templateId: [''],
    //         ride_Scrutiny_Templates: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         totalLeftMinutes: [''],
    //         enable24Hours: [''],
    //         startTime: [''],
    //         endTime: [''],
    //         appliedDays: [''],
    //         sendCustomerNotification: [],
    //         sendAdminNotification: [],
    //         allowRideEnd: [],
    //         turnSpeedLow: [],
    //         turnThrottleOff: [],
    //         no_Of_Rides:[],
    //         sequence:[],
    //     })
    // }
    // newSettings4(): FormGroup {
    //     return this._formBuilder.group({
    //         id: [],
    //         templateId: [''],
    //         ride_Scrutiny_Templates: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         totalLeftMinutes: [''],
    //         enable24Hours: [''],
    //         startTime: [''],
    //         endTime: [''],
    //         appliedDays: [''],
    //         sendCustomerNotification: [],
    //         sendAdminNotification: [],
    //         allowRideEnd: [],
    //         turnSpeedLow: [],
    //         turnThrottleOff: [],
    //         no_Of_Rides:[],
    //         sequence:[],
    //     })
    // }
    // newSettings5(): FormGroup {
    //     return this._formBuilder.group({
    //         id: [],
    //         templateId: [''],
    //         ride_Scrutiny_Templates: this._formBuilder.control({
    //             id: [''],
    //             title: ['']
    //         }),
    //         totalLeftMinutes: [''],
    //         enable24Hours: [''],
    //         startTime: [''],
    //         endTime: [''],
    //         appliedDays: [''],
    //         sendCustomerNotification: [],
    //         sendAdminNotification: [],
    //         allowRideEnd: [],
    //         turnSpeedLow: [],
    //         turnThrottleOff: [],
    //         no_Of_Rides:[],
    //         sequence:[],
    //     })
    // }
    onSubmitForm() {
        this.setValue();
        this.editNewZone(this.zoneEditForm.value)
    }
    editNewZone(zone: EditZoneDao) {
        this.service.updateZone(zone).pipe(first())
            .subscribe({
                next: (response) => {
                    this.main.editPanelActive = false;
                    this.main.bottomPanelActive = false;
                    this.activeIndex = 0;
                    this.btnloading = false;
                    this.buttonDisable = false;
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
    setValue() {
        // this.zoneEditForm.value.ride_fare_setting = this.zoneFare;
        // this.zoneEditForm.value.ride_scrutiny_setting = this.lstScrutinySettings1;
        // this.zoneEditForm.value.ride_scrutiny_setting2 = this.lstScrutinySettings2;
        // this.zoneEditForm.value.ride_scrutiny_setting3 = this.lstScrutinySettings3;
        // this.zoneEditForm.value.ride_scrutiny_setting4 = this.lstScrutinySettings4;
        // this.zoneEditForm.value.ride_scrutiny_setting5 = this.lstScrutinySettings5;
        this.zoneEditForm.value.zone_Coordinates = this.zoneCordinates2;
        //this.setPackageIds();
       // this.zoneEditForm.value.walletPackagesIds = this.lstWalletPackageIds;
        this.zoneEditForm.value.center_Latitude = this.currentlat;
        this.zoneEditForm.value.center_Longitude = this.currentlng;
        //this.zoneEditForm.value.default_Speed = this.defaultSpeed;

    }
    addEdge(event, points, edgeCount: number) {
        let point = { lat: event.latLng.lat(), lng: event.latLng.lng() };

        if (event.vertex !== undefined) {

            if (event.vertex == points.length - 1) {
                points[0] = point;
                points[event.vertex] = point;
            } else {
                points[event.vertex] = point;
            }
            if (edgeCount == 1) {
                points.pop(points.length - 1);
                edgeCount++;
                this.edgeCount = edgeCount;
            }

        } else if (event.edge !== undefined) {
            points.splice(event.edge + 1, 0, point[0]);
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i] == undefined) {
                points[i] = { lat: point.lat, lng: point.lng }
            }
        }
        this.pointList = [];
        const len = points.length;
        for (let i = 0; i < len; i++) {
            this.pointList.push({ lat: points[i].lat, lng: points[i].lng }
            );
        }
        this.setCoordinates();
    }

    onMapReady(map) {
        this.initDrawingManager(map);
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
    setCoordinates() {
        if (this.pointList.length > 0) {
            var lstzoneCoordinates = [];
            this.pointList.forEach(function (item_lat_lng, index) {
                lstzoneCoordinates.push({ lat: item_lat_lng.lat, lng: item_lat_lng.lng, sequence: index + 1 });
            });
        }
        if (
            lstzoneCoordinates[0].latitude === lstzoneCoordinates[lstzoneCoordinates.length - 1].latitude &&
            lstzoneCoordinates[0].longitude === lstzoneCoordinates[lstzoneCoordinates.length - 1].longitude
          ) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: '', life: 3000 });
          } else 
            this.messageService.add({ severity: 'warning', summary: 'Failed', detail:'Wrong polygone', life: 3000 });
          
        this.zoneCordinates2 = lstzoneCoordinates;
        this.zoneEditForm.value.zone_Coordinates = this.zoneCordinates2;
    }
    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentlat = position.coords.latitude;
                this.currentlng = position.coords.longitude;
            });
        }
    }

    // removefare(i) {
    //     this.zoneFare.forEach((element, index) => {
    //         if (index == i)
    //             this.zoneFare.splice(index, 1);
    //     });
    // }
    // addfare(i, fare) {
    //     this.submitted = true;
    //     if (fare.value.rideTypeId !== "" && fare.value.vehicleCompanyId !== "" && fare.value.fixed_Start_Price !== ""
    //         && fare.value.time_Price !== "" && fare.value.price_Per_Kilometer !== "") {

    //         if (fare.value.time_Price <= 100 && fare.value.price_Per_Kilometer <= 100 && fare.value.fixed_Start_Price <= 100) {
    //             this.submitted = false;
    //             fare.value.rideType.title = this.rideTypName;
    //             fare.value.rideType.id = fare.value.rideTypeId;
    //             fare.value.vehicleCompany.name = this.vehicaleCompany;
    //             fare.value.vehicleCompany.id = fare.value.vehicleCompanyId;
    //             this.zoneFare.push(fare.value);
    //             this.ride_fare_setting().removeAt(i)
    //             this.ride_fare_setting().push(this.newfare());
    //         }

    //     }

    // }
    // rideTypeName(rideType: Dropdown) {
    //     this.rideTypName = rideType.selectedOption.label;
    // }

    // addSetting(i, setting,rideIndex) {
      
    //     this.submitted = true;
    //     setting.value.appliedDays = Object.values(this.appliedDays).join("");
    //     if (setting.value.enable24Hours == true) {
    //         setting.value.startTime = "12:00:00";
    //         setting.value.endTime = "12:00:00";
    //     }
    //     else {
    //         const startdate = new Date(setting.value.startTime);
    //         setting.value.startTime = `${startdate.getHours()}:${startdate.getMinutes()}:${startdate.getSeconds()}`;
    //         const enddate = new Date(setting.value.endTime);
    //         setting.value.endTime = `${enddate.getHours()}:${enddate.getMinutes()}:${enddate.getSeconds()}`;
    //     }
    //     if (setting.value.templateId !== "" && setting.value.totalLeftMinutes !== "" &&
    //         setting.value.startTime !== "" && setting.value.endTime !== ""  && setting.value.appliedDays !== '0000000') {
    //         this.submitted = false;
    //         setting.value.ride_Scrutiny_Templates.title = this.scrutinyTemplate;
    //         setting.value.ride_Scrutiny_Templates.id = setting.value.templateId;

    //         if (this.getId != null) {

    //             if(rideIndex == 0)
    //             {
    //               setting.value.id = this.getId;
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               setting.value.sequence = this.lstScrutinySettings1[0].sequence;
    //               this.lstScrutinySettings1.splice(this.getindex, 1, setting.value);
    //             //   this.allLstScrutinySettings.splice(this.getindex, 1, setting.value);
            
    //             }
    //             if(rideIndex == 1)
    //             {
    //               setting.value.id = this.getId;
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               setting.value.sequence = this.lstScrutinySettings2[0].sequence;
    //               this.lstScrutinySettings2.splice(this.getindex, 1, setting.value);
    //             //   this.allLstScrutinySettings.splice(this.getindex, 1, setting.value);
    //             }
    //             if(rideIndex == 2)
    //             {
    //               setting.value.id = this.getId;
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               setting.value.sequence = this.lstScrutinySettings3[0].sequence;
    //               this.lstScrutinySettings3.splice(this.getindex, 1, setting.value);
    //             //   this.allLstScrutinySettings.splice(this.getindex, 1, setting.value);
    //             }
    //             if(rideIndex == 3)
    //             {
    //               setting.value.id = this.getId;
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               setting.value.sequence = this.lstScrutinySettings4[0].sequence;
    //               this.lstScrutinySettings4.splice(this.getindex, 1, setting.value);
    //             //   this.allLstScrutinySettings.splice(this.getindex, 1, setting.value);
    //             }
    //             if(rideIndex == 4)
    //             {
    //               setting.value.id = this.getId;
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               setting.value.sequence = this.lstScrutinySettings5[0].sequence;
    //               this.lstScrutinySettings5.splice(this.getindex, 1, setting.value);
    //             //   this.allLstScrutinySettings.splice(this.getindex, 1, setting.value);
    //             }
    //             this.getId = null;
    //         }
    //         else {
    //             if(rideIndex == 0)
    //             {
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               this.sequence1 = this.lstScrutinySettings1.length + 1 ;
    //               setting.value.sequence = this.sequence1++;
    //               this.lstScrutinySettings1.push(setting.value);
    //             //   this.allLstScrutinySettings.push(setting.value);
    //             }
    //             if(rideIndex == 1)
    //             {
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               this.sequence2 = this.lstScrutinySettings2.length + 1 ;
    //               setting.value.sequence = this.sequence2++;
    //               this.lstScrutinySettings2.push(setting.value);
    //             //   this.allLstScrutinySettings.push(setting.value);    
    //             }
    //             if(rideIndex == 2)
    //             {
    //               setting.value.no_Of_Rides = rideIndex+1;
    //               this.sequence3 = this.lstScrutinySettings3.length + 1 ;
    //               setting.value.sequence = this.sequence3++;
    //               this.lstScrutinySettings3.push(setting.value);
    //             //   this.allLstScrutinySettings.push(setting.value);
    //             }
    //             if(rideIndex == 3)
    //             {
    //               setting.value.no_Of_Rides = rideIndex + 1;
    //               this.sequence4 = this.lstScrutinySettings4.length + 1 ;
    //               setting.value.sequence = this.sequence4++;
    //               this.lstScrutinySettings4.push(setting.value);
    //             //   this.allLstScrutinySettings.push(setting.value);
    //             }
    //             if(rideIndex == 4)
    //             {
    //               setting.value.no_Of_Rides = rideIndex + 1;
    //               this.sequence5 = this.lstScrutinySettings5.length + 1 ;
    //               setting.value.sequence = this.sequence5++;
    //               this.lstScrutinySettings5.push(setting.value);
    //             //   this.allLstScrutinySettings.push(setting.value);
    //             }   
    //         }
      
    //         this.ride_scrutiny_setting().removeAt(i)
    //         this.ride_scrutiny_setting().push(this.newSettings());
    //         Object.keys(this.appliedDays).forEach(w => this.appliedDays[w] = 0)


    //         this.enable24Hours = false;
    //         this.turnThrottleOff = false;
    //         this.turnSpeedLow = false;
    //         this.allowRideEnd = false;
    //         this.sendAdminNotification = false;
    //         this.sendCustomerNotification = false;
    //         this.getTotalLeftMinutes = 0;
    //         this.buttonLable = "Add";

    //     }
    // }

    // removeSetting(i) {
    //     this.lstScrutinySettings.forEach((element, index) => {
    //         if (index == i)
    //             this.lstScrutinySettings.splice(index, 1);
    //     });

    // }

    // scrutinyTemplateName(scrutinyTemplate: Dropdown) {
    //     this.scrutinyTemplate = scrutinyTemplate.selectedOption.label;
    // }

    // companyName(company: Dropdown) {
    //     this.vehicaleCompany = company.selectedOption.label;
    // }
    // loadDropdownCountry() {
    //     //load counties
    //     this._PromoCodeService.loadDropDown().subscribe(responseList => {
    //         this.lstCountries = responseList.result.lstCountries;
    //     });
    // }
    onSelect(e) {
        this.getlstCities = this.lstCities.filter(z => z.country_Id == e.value);

    }

    setCities(country_Id) {
        this.getlstCities = this.lstCities?.filter(z => z.country_Id == country_Id);
    }
    onRemovePolygon() {
        this.zoneCordinates = [];
        this.pointList = [];
    }
    myModelChanged(e, i) {
        this.appliedDays[i] = !e.target.checked && !!this.appliedDays[i] ? 0 : 1
    }

    setWeekDays(week: string) {
        return week.split(/([0-9])/).filter(w => w != "").map((w: string, i: number) => {
            if (parseInt(w) == 1) {
                return this.weeks[i];
            } return ""
        }).filter(w => w).join(", ")
    }
      setPackageIds(){
        var lstPackageIds = [];
        
        this.zoneEditForm.value.walletPackagesIds != null ?  this.zoneEditForm.value.walletPackagesIds.forEach(Package =>  {
          lstPackageIds.push(Package.code);
        }) : this.defaultPackages.forEach(Package =>  {
             lstPackageIds.push(Package)
        });
          
        this.lstWalletPackageIds = lstPackageIds;
      }
    editSetting(index, detail, label,rideIndex) {

        this.getindex = index;
        this.buttonLable = label;
        this.getId = detail.id;
        this.getTotalLeftMinutes = detail.totalLeftMinutes;
        this.enable24Hours = detail.enable24Hours;
        this.templateId = detail.ride_Scrutiny_Templates.id;
        this.scrutinyTemplate = detail.ride_Scrutiny_Templates.title;
        this.turnThrottleOff = detail.turnThrottleOff;
        this.turnSpeedLow = detail.turnSpeedLow;
        this.allowRideEnd = detail.allowRideEnd;
        this.sendAdminNotification = detail.sendAdminNotification;
        this.sendCustomerNotification = detail.sendCustomerNotification;
        const temp = detail.appliedDays.split(/([0-9])/).filter(w => w != "")
        Object.keys(this.appliedDays).forEach((w, i) => this.appliedDays[w] = +temp[i])

    }

    modalClose() {
        Object.keys(this.appliedDays).forEach(w => this.appliedDays[w] = 0)
    }  
    speedMode(event) {
        this.defaultSpeed = event.value
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}