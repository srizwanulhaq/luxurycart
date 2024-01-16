import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditRideDto } from 'src/app/demo/domain/Dto/Rides/EditRideDto';
import { RideService } from 'src/app/demo/service/rideservice';
import { RideMainComponent } from '../ride-main/ride-main.component';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ride-edit',
  templateUrl: './ride-edit.component.html',
  styleUrls: ['./ride-edit.component.scss']
})
export class RideEditComponent implements OnInit {

  @Input() editRideData: EditRideDto;
  rideEditForm:FormGroup;
  btnloading:boolean;
  submitted:Boolean;
  constructor(private _formBuilder: FormBuilder,
    private rideServie: RideService,
    private messageService: MessageService,
    public main: RideMainComponent) { }

  ngOnInit(): void {
    this.rideEditForm = this._formBuilder.group({
      id: ["", [Validators.required]],
      headCount: ["", [Validators.required]],
    });
  }
  @Output() eventChange = new EventEmitter<Event>();

  ngOnChanges(change: SimpleChange) {
    if (!!change['editRideData'].currentValue) {

        const temp = change['editRideData'].currentValue;
        const group: FormGroup = this.rideEditForm as FormGroup;
        group.controls['id'].setValue(temp.id || "");
        group.controls['headCount'].setValue(temp.head_Count || 0);
    }
  }

  
  onSubmitForm(){
    this.btnloading = true;
    if (this.rideEditForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.editExitRide(this.rideEditForm.value);
  }
  editExitRide(ridedto: EditRideDto) {
    this.submitted = true;
    this.rideServie.editheadCount(ridedto).pipe(first())
    .subscribe({
      next: (response) => {
        if (response.status) {
          this.eventChange.emit(response.status);
          this.main.editPanelActive = false;
          this.main.bottomPanelActive = false;
          this.btnloading = false;
          this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
        }else {
          this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
        }
      },
      error: (error) => {
        this.main.editPanelActive = false;
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
      },
  });
}

}
