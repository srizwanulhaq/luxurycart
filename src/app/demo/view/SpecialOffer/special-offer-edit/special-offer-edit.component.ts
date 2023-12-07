import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { SpecialOfferDao } from 'src/app/demo/domain/Dao/SpecialOffer/SpecialOfferDao';
import { EditSpecialOfferDto } from 'src/app/demo/domain/Dto/SpecialOffer/EditSpecialOfferDto';
import { SpecialOfferService } from 'src/app/demo/service/special-offer.service';
import { SpecialOfferMainComponent } from '../special-offer-main/special-offer-main.component';

@Component({
  selector: 'app-special-offer-edit',
  templateUrl: './special-offer-edit.component.html',
  styleUrls: ['./special-offer-edit.component.scss'],
  providers: [MessageService,DatePipe],
})
export class SpecialOfferEditComponent implements OnInit {


  private _details:SpecialOfferDao;
  @Input() editSpecialOfferData: EditSpecialOfferDto;
  SpecialofferEditForm: any;
  btnloading:boolean;
  lstZones:SelectItem[] = [];


  constructor(private service: SpecialOfferService,
    public main: SpecialOfferMainComponent,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe) { 
      this.loadDropdownValues();
    }
  
  @Output() eventChange = new EventEmitter<Event>();


  ngOnInit(): void {
    this.loadForm();
  }


  ngOnChanges(change: SimpleChange) {
    if (!!change['editSpecialOfferData'].currentValue) {
        const temp = change['editSpecialOfferData'].currentValue;
        const group: FormGroup = this.SpecialofferEditForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['amount'].setValue(temp.amount || "");
        group.controls['title'].setValue(temp.title || "");
        group.controls['parkingZoneId'].setValue(temp.parking_Zones.id || "" );
        group.controls['total_Free_Rides'].setValue(temp.total_Free_Rides || 0 );
        group.controls['total_Ride_Minutes'].setValue(temp.total_Ride_Minutes || 0 );
        group.controls['valid_Days'].setValue(temp.valid_Days || 0 );
        group.controls['offer_Purchase_Limit'].setValue(temp.offer_Purchase_Limit || 0 );
        group.controls['expiry_Date'].setValue(temp.expiry_Date || "");
        group.controls['expiry_Date'].setValue(this.datePipe.transform(temp.expiry_Date, 'yyyy-MM-dd'));
    }
  }

  loadForm() {
    this.SpecialofferEditForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      amount: ["", [Validators.required , Validators.pattern('[()0-9]+')]],
      parkingZoneId: ["", [Validators.required]],
      title: ["", [Validators.required]],
      total_Free_Rides: ["", [Validators.required ,Validators.pattern('[()0-9]+')]],
      total_Ride_Minutes: ["", [Validators.required ,Validators.pattern('[()0-9]+')]],
      valid_Days: ["", [Validators.required ,Validators.pattern('[()0-9]+')]],
      offer_Purchase_Limit:["", [Validators.required ,Validators.pattern('[()0-9]+')]],
      expiry_Date:["", [Validators.required]],
    });
  }

  onSubmitForm(){
    this.btnloading = true;
    if (this.SpecialofferEditForm.invalid) {
      this.btnloading = false;
      return;
    }
   
    this.updateSpecialOffer(this.SpecialofferEditForm.value);
  }

  updateSpecialOffer(offer: EditSpecialOfferDto) {
    this.service.updateOffer(offer).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.main.editPanelActive = false;
            this.main.bottomPanelActive = false;
            if (response.status) {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              
            }else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
          },
          error: (error) => {
            this.btnloading = false;
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
  }
  resetForm() {
    this.SpecialofferEditForm.reset();
    this.btnloading = false;
  }
  loadDropdownValues() {
    //load Parking zones
    this.service.parkingZones().then(responseList => {
      this.lstZones = responseList.lstZones;
    });
  }
}
