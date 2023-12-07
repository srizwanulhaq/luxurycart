import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ZoneDao } from 'src/app/demo/domain/Dao/Partmers/zone-dao';
import { first } from 'rxjs/operators';
import { Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import { PackagediscountService } from 'src/app/demo/service/packagediscount.service';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { PartnerService } from 'src/app/demo/service/partner.service';


@Component({
  selector: 'app-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss'],
  providers:[MessageService]
})
export class PartnerCreateComponent implements OnInit {

  partnerDialog:boolean;
  partnerForm:any;
  checked:boolean = false;
  lstCountries: SelectItem[] = [];
  lstCities: Citydao2[];
  getlstCities: Citydao2[];
  cityZone:ZoneDao[] = [];
  btnLoading:boolean;
  submitted:boolean;

  constructor(private _formBuilder: FormBuilder,
    private service:PartnerService,
    private _zoneService: ZoneService,
    private _promoCodeService: PackagediscountService,
    private _packageDiscountService: PackagediscountService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownCountry();
  }

@Output() eventChange = new EventEmitter<Event>();

  openNew() {
    this.partnerDialog = true;
  }
  onSubmitForm() {
    this.btnLoading = true;
    this.submitted = true;
    if (this.partnerForm.invalid) {
        this.btnLoading = false;
        return;
    }

    if(this.partnerForm.value.zoneIds != null || this.partnerForm.value.zoneIds.length > 0 )
    this.addNewPartner(this.partnerForm.value);
}

addNewPartner(partner) {

    this.service.savePartner(partner).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.partnerDialog = false;
                if (response.status) {
                    this.eventChange.emit(response.status);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                }
            },
            error: (error) => {
                this.btnLoading = false;
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
            },
        });
}
resetForm(){
  this.partnerForm.reset();
  this.btnLoading = false;
}
  loadForm() {
    this.partnerForm = this._formBuilder.group({
        name: ["", [Validators.required]],
        country_Id: ["", [Validators.required]],
        city_Id: ["", [Validators.required]],
        share: ["", [Validators.required]],
        start_Date: ["", [Validators.required]],
        end_Date: ["", [Validators.required]],
        vat: ["", [Validators.required]],
        zoneIds:[],
    });

    
}
loadDropdownCountry() {
  //load counties
  this._promoCodeService.loadDropDown().subscribe(responseList => {
    this.lstCountries = responseList.result.lstCountries;
    this.lstCountries.sort((a,b) => a.label > b.label ? 1:-1);
  });

}

onSelect(e) {
  this._zoneService.loadCityDropDown().subscribe(responseList => {
    this.lstCities = responseList.result.lstcities;
    this.getlstCities = this.lstCities.filter(z => z.country_Id == e.value);
    this.getlstCities.sort((a,b) => a.label > b.label ? 1 : -1);
  });
 }

onSelectZone(e) {
  this._packageDiscountService.getparkingzones()
  .subscribe(resp => {
    this.cityZone = resp.data.filter(z =>  z.city != null &&  z.city.id == e.value);  
    this.cityZone.sort((a,b) => a.name > a.name ? 1:-1);     
  });
 }

}
