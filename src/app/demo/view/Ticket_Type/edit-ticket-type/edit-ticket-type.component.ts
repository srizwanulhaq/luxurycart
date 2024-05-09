import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TicketType } from 'src/app/demo/domain/Dao/TicketType/ticket-type.model';
import { VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { TicketTypeMainComponent } from '../ticket-type-main/ticket-type-main.component';
import { TicketTypeService } from 'src/app/demo/service/ticket-type.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-ticket-type',
  templateUrl: './edit-ticket-type.component.html',
  styleUrls: ['./edit-ticket-type.component.scss']
})
export class EditTicketTypeComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  ticketForm: any;
  project: ProjectDropDown[];
  vehicleType: VehicleTypeDropDown[];
  private _details: TicketType;
  btnloading: boolean;
  ticketTypeEditDialog: boolean;
  
  constructor(private _service: TicketTypeService, 
              public main: TicketTypeMainComponent,
              private messageService: MessageService,
              private cdref: ChangeDetectorRef,
              private _formBuilder: FormBuilder,
            private zoneService:ZoneService) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
  
  }
  
  loadForm() {
    this.ticketForm = this._formBuilder.group({
      id:["", [Validators.required]],
      title: ["", [Validators.required]],
      project_Id: ["", [Validators.required]],
      vehicle_Type_Id: ["", [Validators.required]],
      ticket_Price: ["", [Validators.required]]
      });
  }
  loadDropdownValues() {
    this.zoneService.getProjectDropdowns().then(resp => {
      if (resp) {
          this.project = resp;
      }});
      this.zoneService.getVehicleTypeDropdown().subscribe(resp => {
        if (resp.status) {
            this.vehicleType = resp.data;
        }});
  
  }
  

  @Input() 
  set details(value: TicketType) {
    if (value) {
      this.loadDropdownValues();
      this._details = value;
      this.resetForm();
      this.setValues();
     
    }
  }

  get details(): TicketType {
    return this._details;
  }

  setValues() {
    if(this.details){
      
      this.ticketForm.controls.id.setValue(this.details.id);
      this.ticketForm.controls.title.setValue(this.details.title);
      this.ticketForm.controls.ticket_Price.setValue(this.details.ticket_Price);
      this.ticketForm.controls.project_Id.setValue(this.details.project_Id);
      this.ticketForm.controls.vehicle_Type_Id.setValue(this.details.vehicle_Type_Id);
      
    }
  }

  onSubmitForm(){
    this.btnloading = true;
    if (this.ticketForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.updateVehicle(this.ticketForm.value);
  }
 
  updateVehicle(user: TicketType) {
    this._service.updateTicketType(user).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.ticketTypeEditDialog = false;
            this.main.editPanelActive = false;
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
    this.ticketForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
