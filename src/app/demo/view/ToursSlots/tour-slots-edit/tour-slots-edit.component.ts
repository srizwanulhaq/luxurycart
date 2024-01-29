import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { TourSlotsMainComponent } from '../tour-slots-main/tour-slots-main.component';
import { EditCityDto } from 'src/app/demo/domain/Dto/Cities/EditCityDto';
import { TourService } from 'src/app/demo/service/tour.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditTourDto } from 'src/app/demo/domain/Dto/TourSlots/EditTourDto';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-tour-slots-edit',
  templateUrl: './tour-slots-edit.component.html',
  styleUrls: ['./tour-slots-edit.component.scss'],
  providers: [MessageService]
})
export class TourSlotsEditComponent implements OnInit {
  @Input() editTourData: EditTourDto;
  slotEditForm;
  btnloading: false;
  lstPoints: SelectItem[] = [];
  lstTimeSlots: SelectItem[] = [];
  lstTourPackages: SelectItem[] = [];
  @Output() eventChange = new EventEmitter<Event>();
  constructor(public main: TourSlotsMainComponent,
    private _tourService: TourService, private _formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.loadForm();
    this.loadDropdownValues();
  }
  loadForm() {
    this.slotEditForm = this._formBuilder.group({
      time_Slot: ["", [Validators.required]],
      id: ["", [Validators.required]],
      tourPackagesIds: [],
    });
  }

  ngOnChanges(change: SimpleChange) {
    var id=[];
    if (!!change['editTourData'].currentValue) {
      const temp = change['editTourData'].currentValue;
      const group: FormGroup = this.slotEditForm as FormGroup;
      group.controls['id'].setValue(temp.id || "");
      group.controls['time_Slot'].setValue(temp.time_Slot || "");
      temp.lstTourPackage.forEach(element => {
        id.push(element.id);
      })
      group.controls['tourPackagesIds'].setValue(id || "");
    }
  }


  onSubmitForm() {
    if (this.slotEditForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.Editslots(this.slotEditForm.value);
  }
  Editslots(slots: EditTourDto) {

    this._tourService.editTourSlots(slots).pipe(first())
      .subscribe({
        next: (response) => {
          // this.resetForm();
          this.main.editPanelActive = false;
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
  loadDropdownValues() {
    this._tourService.requestDataFromMultipleSources().then(responseList => {
      this.lstPoints = responseList.lstPoints;
      this.lstTimeSlots = responseList.lstTimeSlots;
      this.lstTourPackages = responseList.lstTourPackages;

    });
  }
}
