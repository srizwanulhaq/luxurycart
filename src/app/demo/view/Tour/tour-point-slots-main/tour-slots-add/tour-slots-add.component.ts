import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { TourService } from 'src/app/demo/service/tour.service';

@Component({
  selector: 'app-tour-slots-add',
  templateUrl: './tour-slots-add.component.html',
  styleUrls: ['./tour-slots-add.component.scss']
})
export class TourSlotsAddComponent implements OnInit {
  addSlotDialog: boolean;
  tourSlotForm: FormGroup;
  submitted = false;
  eventChange: any;
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
    // this.btnloading = true;
    // if (this.customerRegisterForm.invalid) {
    //   this.btnloading = false;
    //   return;
    // }

    var model = {
      time_Slot: this.tourSlotForm.value.time,
      
    };
    console.log(model);
    this._tourService
      .addTourTime(model)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.eventChange.emit(response.status);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
            // this.main.addPanelActive = false;
            // this.btnloading = false;
            // this.resetForm();
          } else {
            this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
            // this.main.addPanelActive = true;
            // this.btnloading = false;
          }
        },
        error: (error) => {
          // this.main.addPanelActive = true;
          // this.btnloading = false;
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
        },
      });
  }
}

