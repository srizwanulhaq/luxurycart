import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { TourSlotsMainComponent } from '../tour-slots-main/tour-slots-main.component';
import { EditCityDto } from 'src/app/demo/domain/Dto/Cities/EditCityDto';
import { TourService } from 'src/app/demo/service/tour.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditTourDto } from 'src/app/demo/domain/Dto/TourSlots/EditTourDto';

@Component({
  selector: 'app-tour-slots-edit',
  templateUrl: './tour-slots-edit.component.html',
  styleUrls: ['./tour-slots-edit.component.scss']
})
export class TourSlotsEditComponent implements OnInit {
  @Input() editTourData: EditTourDto;
  slotEditForm;
  @Output() eventChange = new EventEmitter<Event>();
  constructor(public main: TourSlotsMainComponent,
     private _tourService: TourService, private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loadForm();
  }
  loadForm() {
    this.slotEditForm = this._formBuilder.group({
      time_Slots: ["", [Validators.required]],
      id: ["", [Validators.required]],
    });
  }

  ngOnChanges(change: SimpleChange) {
    if (!!change['editTourData'].currentValue) {
      const temp = change['editTourData'].currentValue;
      const group: FormGroup = this.slotEditForm as FormGroup;
      group.controls['id'].setValue(temp.id || "");
      group.controls['time_Slots'].setValue(temp.name || "");
    }
  }

  
  onSubmitForm() {
    // this.btnloading = true;
    if (this.slotEditForm.invalid) {
      // this.btnloading = false;
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
            // this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          } else {
            // this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
          }
        },
        error: (error) => {
          // this.btnloading = false;
          // this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
        },
      });
  }
}
