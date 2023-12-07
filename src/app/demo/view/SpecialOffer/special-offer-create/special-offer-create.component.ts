import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AddSpecialOfferDto } from 'src/app/demo/domain/Dto/SpecialOffer/AddSpecialOfferDto';
import { SpecialOfferService } from 'src/app/demo/service/special-offer.service';
import { SpecialOfferMainComponent } from '../special-offer-main/special-offer-main.component';

@Component({
  selector: 'app-special-offer-create',
  templateUrl: './special-offer-create.component.html',
  styleUrls: ['./special-offer-create.component.scss'],
  providers:[MessageService]
})
export class SpecialOfferCreateComponent implements OnInit {


  SpecialOfferSaveForm:any;
  btnloading: boolean;
  offerDialog: boolean;
  submitted: boolean;
  lstZones: SelectItem[] = [];


  constructor(private service: SpecialOfferService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public main: SpecialOfferMainComponent,) { }

    @Output() eventChange = new EventEmitter<Event>();
    
  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.SpecialOfferSaveForm = this._formBuilder.group({
      amount: ["", [Validators.required]],
      parkingZoneId: ["", [Validators.required]],
      title: ["", [Validators.required]],
      total_Free_Rides: ["", [Validators.required]],
      total_Ride_Minutes: ["", [Validators.required ]],
      valid_Days: ["", [Validators.required ]],
      offer_Purchase_Limit:["", [Validators.required ]],
      expiry_Date:["", [Validators.required]],
    });
  }

  openForm() {
    this.submitted = false;
    this.offerDialog = true;
    this.main.event = null;
    this.resetForm();
    this.loadDropdownValues();
  }

  onSubmitForm() {
    this.btnloading = true;
    if (this.SpecialOfferSaveForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.addNewOffer(this.SpecialOfferSaveForm.value);
  }

  addNewOffer(offer: AddSpecialOfferDto) {
    this.service.saveOffer(offer).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.offerDialog = false;
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
    this.SpecialOfferSaveForm.reset();
    this.btnloading = false;
  }
  loadDropdownValues() {
    //load Parking zones
    this.service.parkingZones().then(responseList => {
      this.lstZones = responseList.lstZones;
    });
  }

}
