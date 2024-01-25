import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PointSlotDto } from 'src/app/demo/domain/Dto/PointSlots/PointSlotDto';
import { TourPointSlotsMainComponent } from '../tour-point-slots-main/tour-point-slots-main.component';
import { MessageService, SelectItem } from 'primeng/api';
import { TourPointSlotService } from 'src/app/demo/service/tour-point-slot.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tour-point-slots-edit',
  templateUrl: './tour-point-slots-edit.component.html',
  styleUrls: ['./tour-point-slots-edit.component.scss'],
  providers:[MessageService]
})
export class TourPointSlotsEditComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  @Input() editPointSlotData: PointSlotDto;
  submitted:boolean;
  PointSlotUpdateForm: FormGroup;
  btnLoading:boolean;
  lstPoints: SelectItem[] = [];
  lstTimeSlots: SelectItem[] = [];
  lstTourPackages: SelectItem[] = [];
  constructor(public main: TourPointSlotsMainComponent,
    private _formBuilder: FormBuilder,
    private service:TourPointSlotService ,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
  }
  loadDropdownValues() {
    this.service.requestDataFromMultipleSources().then(responseList => {
        this.lstPoints = responseList.lstPoints;
        this.lstTimeSlots = responseList.lstTimeSlots;
        this.lstTourPackages = responseList.lstTourPackages;
        
    });
    }

    loadForm() {
      this.PointSlotUpdateForm = this._formBuilder.group({
          total_Seat: [""],
          left_Seat:[""],
          id:[""],
          point_Id: ["", [Validators.required]],
          tour_Slot_Id: ["", [Validators.required]],
          tourPackagesIds:[],
      });
    }
  
 
  ngOnChanges(change: SimpleChange) {
    var id=[];
    if (!!change['editPointSlotData'].currentValue) {
      
        const temp = change['editPointSlotData'].currentValue
        console.log(temp);
        const group: FormGroup = this.PointSlotUpdateForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        
        group.controls['total_Seat'].setValue(temp.total_Seat || "");
        group.controls['left_Seat'].setValue(temp.left_Seat || "");
        
        group.controls['point_Id'].setValue(temp.points.id || "");
        group.controls['tour_Slot_Id'].setValue(temp.tour_Slots.id || "");

        temp.lstTourPackage.forEach(element=>
          {
            id.push(element.id);
          })
        group.controls['tourPackagesIds'].setValue(id || "");
        
        
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.PointSlotUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    this.UpdatePoint(this.PointSlotUpdateForm.value);
  }
  UpdatePoint(point) 
  {
    this.service.updatePointSlot(point).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.main.editPanelActive = false;
                this.main.bottomPanelActive=false;
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
    this.PointSlotUpdateForm.reset();
    this.btnLoading = false;
  }

}
