import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { WalletPackageDao } from 'src/app/demo/domain/Dao/WalletPackages/WalletPackageDao';
import { Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import {  NewZoneDao, RideFareSetting, RideScrutinySettingsDto, Zone_Coordinates, Zone_CoordinatesDao, Zone_PriceDao } from 'src/app/demo/domain/Dao/Zone/NewZoneDao';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZonePriceMainComponent } from '../zone-price-main/zone-price-main.component';
import { DriveModeDropDown, VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';
import { SpecialOfferService } from 'src/app/demo/service/special-offer.service';

@Component({
  selector: 'app-zone-price-edit',
  templateUrl: './zone-price-edit.component.html',
  styleUrls: ['./zone-price-edit.component.scss'],
  providers: [MessageService]
})
export class ZonePriceEditComponent implements OnInit {

  submitted: boolean;
  IsSameZone: boolean;
zoneDialog: boolean;
  @Input() zonePriceData: any;
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
  lstZones: SelectItem[] = [];
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
  driveModeDropDown:DriveModeDropDown[];
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
  markerPin: { lat: number, lng: number }[] = [];
  validatedays:string;
  vehicleType:VehicleTypeDropDown[];
  project:ProjectDropDown[];
  lstWalletPackageIds:string[];
  mappedCoordinates: { lat: number, lng: number, sequence:number }[] = [];


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

  constructor(public main: ZonePriceMainComponent, private service: ZoneService,
    private service1: SpecialOfferService,
    private _formBuilder: FormBuilder, private messageService: MessageService,
    private _PromoCodeService: PackagediscountService,private projectService:ProjectsService, 
    private cdref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadForm();
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
    this.ZoneloadDropdownValues();
    this.loadDropdownValues();
    //this.setOptionForRides();

  }
  setOption() {
    this.items = [{
      label: 'Zone Information',
    },
    {
      label: 'Draw Zone',
    },
    {
      label: 'Add Point Zone',
    }
    ];

  }
  ZoneloadDropdownValues() {
    //load Parking zones
    this.service1.parkingZones().then(responseList => {
      
      this.lstZones = responseList.lstZones;
    });
    this.FillData();
  }
  FillData(){
    
    const group: FormGroup = this.zoneForm as FormGroup;
    group.controls['Id'].setValue(this.zonePriceData.id || "");
    group.controls['from_zone'].setValue(this.zonePriceData.fromZone || "");
    group.controls['to_zone'].setValue(this.zonePriceData.toZone || "");
    group.controls['zone_price'].setValue(this.zonePriceData.price || "");
  }
  loadDropdownValues()
  {
    this.service.getProjectDropdowns().then(resp => {
      if (resp) {
          this.project = resp;
      }});
      
  }


  loadForm() {
    this.zoneForm = this._formBuilder.group({
      Id:["",[Validators.required]],
      from_zone:["",[Validators.required]],
      to_zone:["",[Validators.required]],
      zone_price: [null, [Validators.required, Validators.min(1), Validators.max(10000)]],
    });
  }
 



  onSubmitForm() {

    this.submitted = true;
    if (this.zoneForm.invalid) {
      // Handle invalid form if needed, or just let Angular's form validation handle it
      return;
    }else{
      this.addNewZone(this.zoneForm.value)
    }
    // this.zoneForm.value.zone_Marks = this.markerPin;
    // if(this.markerPin.length > 0){
    // console.log(this.zoneForm.value)
    // this.addNewZone(this.zoneForm.value)
    // }else{
    //     this.submitted=true;
    // }
  }

  addNewZone(zone: Zone_PriceDao) {

    
    this.service.UpdateZonePrice(zone).pipe(first())
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



  

  zonesNotSame(group: AbstractControl) {
    
    const fromZone = group.get('from_zone')?.value;
    const toZone = group.get('to_zone')?.value;
    
    // If both values are equal, return an error object
    if (fromZone && toZone && fromZone === toZone) {
      this.IsSameZone= true;
    }else{
      this.IsSameZone= false;
    }
  }
  // No error
}

