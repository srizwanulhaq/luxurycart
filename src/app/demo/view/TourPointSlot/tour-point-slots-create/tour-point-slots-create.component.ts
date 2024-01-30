import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { TourPointSlotService } from 'src/app/demo/service/tour-point-slot.service';
import { TourPointSlotsMainComponent } from '../tour-point-slots-main/tour-point-slots-main.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tour-point-slots-create',
  templateUrl: './tour-point-slots-create.component.html',
  styleUrls: ['./tour-point-slots-create.component.scss'],
  providers:[MessageService]
})
export class TourPointSlotsCreateComponent implements OnInit {

  pointSlotDialog:boolean;
  pointSlotForm:any
  btnLoading:boolean;
  submitted:boolean;
  lstPoints: SelectItem[] = [];
  lstTimeSlots: SelectItem[] = [];
  lstTourPackages: SelectItem[] = [];
 

  constructor(private _formBuilder: FormBuilder,
    private service: TourPointSlotService,
    private messageService: MessageService,
    private cdref: ChangeDetectorRef,
    private main: TourPointSlotsMainComponent) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  openNew(){
    this.main.event = null;
   this.pointSlotDialog = true;
  }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.pointSlotForm.invalid) {
        this.btnLoading = false;
        return;
    }
    this.addNewPointSlot(this.pointSlotForm.value);
  }
  addNewPointSlot(pointSlot){
    this.service.savePointSlot(pointSlot).pipe(first())
    .subscribe({
        next: (response) => {
            this.resetForm();
            this.pointSlotDialog = false;
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
    this.pointSlotForm.reset();
    this.btnLoading = false;
  }
  loadDropdownValues() {
    this.service.requestDataFromMultipleSources().then(responseList => {
        this.lstPoints = responseList.lstPoints;
        this.lstTimeSlots = responseList.lstTimeSlots;
        this.lstTourPackages = responseList.lstTourPackages;
        console.log(this.lstTourPackages)
    });
}

loadForm() {
  this.pointSlotForm = this._formBuilder.group({
      total_Seat: [""],
      // left_Seat:[""],
      point_Id: ["", [Validators.required]],
      tour_Slot_Id: ["", [Validators.required]],
      // tourPackagesIds:[],
  });
}
}
