import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { TourService } from 'src/app/demo/service/tour.service';

@Component({
  selector: 'app-tour-slots-add',
  templateUrl: './tour-slots-add.component.html',
  styleUrls: ['./tour-slots-add.component.scss'],
  providers:[MessageService]
})

export class TourSlotsAddComponent implements OnInit {
  @Output() eventChange = new EventEmitter<Event>();
  addSlotDialog: boolean;
  tourSlotForm: FormGroup;
  submitted = false;
  btnloading = false;
  constructor(private _formBuilder: FormBuilder, private _tourService: TourService, private messageService: MessageService) { }

  ngOnInit() {
    this.tourSlotForm = this._formBuilder.group({
      time: ["", [Validators.required, Validators.required]],
    });
  }
  openNew() {
    this.addSlotDialog = true;
  }
  onSubmitTourTime() {
    this.btnloading = true;
    var model = {
      time_Slot: this.tourSlotForm.value.time,

    };
    this._tourService
      .addTourSlots(model)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.addSlotDialog = false
          this.resetForm();
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
    this.tourSlotForm.reset();
    this.btnloading = false;
  }
}

