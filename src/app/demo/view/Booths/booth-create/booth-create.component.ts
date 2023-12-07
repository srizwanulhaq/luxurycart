import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoothMainComponent } from '../booth-main/booth-main.component';
import { FormBuilder, Validators } from '@angular/forms';
import { BoothService } from 'src/app/demo/service/booth.service';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-booth-create',
  templateUrl: './booth-create.component.html',
  styleUrls: ['./booth-create.component.scss'],
 providers:[MessageService]

})
export class BoothCreateComponent implements OnInit {


  submitted:boolean;
  boothDialog:boolean;
  boothForm:any;
  btnLoading:boolean;
  lstBoothTypes:SelectItem[] = [];
  lstUsers: SelectItem[] = [];

  constructor(public main: BoothMainComponent,
    private _formBuilder: FormBuilder,
    private service: BoothService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForm()
    this.loadDropdown();
  }
  @Output() eventChange = new EventEmitter<Event>();

  openNew() {
    this.submitted = false;
    this.boothDialog = true;
    this.main.event = null;
    this.resetForm();
}

onSubmitForm(){
  this.btnLoading = true;
  this.submitted = true;
  if (this.boothForm.invalid) {
      this.btnLoading = false;
      return;
  }

  if(this.boothForm.value.mangersIds != null || this.boothForm.value.mangersIds.length > 0 )
  this.addNewBooth(this.boothForm.value);

}
addNewBooth(booth) 
{
  this.service.saveBooth(booth).pipe(first())
      .subscribe({
          next: (response) => {
              this.resetForm();
              this.boothDialog = false;
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
loadForm() {
  this.boothForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      artitle: ["", [Validators.required]],
      boothTypeId: ["", [Validators.required]],
      wait_Time: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      mangersIds:[[],Validators.required],
  });  
}

loadDropdown(){
  this.service.loadMultipleSources().then(responseList => {

    this.lstBoothTypes = responseList.lstBoothTypes;
    this.lstUsers = responseList.lstUsers;
});
}

resetForm(){
  this.boothForm.reset();
  this.btnLoading = false;
}
}
