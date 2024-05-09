import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketTypeService } from 'src/app/demo/service/ticket-type.service';
import { TicketTypeMainComponent } from '../ticket-type-main/ticket-type-main.component';
import { MessageService } from 'primeng/api';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ProjectDropDown } from 'src/app/demo/domain/Dto/Project/projectdto';
import { VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { TicketType } from 'src/app/demo/domain/Dao/TicketType/ticket-type.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-ticket-type',
  templateUrl: './add-ticket-type.component.html',
  styleUrls: ['./add-ticket-type.component.scss']
})
export class AddTicketTypeComponent implements OnInit {
  ticketForm: any;
  project: ProjectDropDown[];
  vehicleType: VehicleTypeDropDown[];
  submitted: boolean;
  ticket_typeDialog: boolean;
  ticket_type: TicketType;
  btnloading: boolean;
  @Output() eventChange = new EventEmitter<Event>();


  constructor(private _formBuilder: FormBuilder,
    private _service: TicketTypeService,
    private main: TicketTypeMainComponent,
    private messageService: MessageService,
    private cdref: ChangeDetectorRef,
    private zoneService:ZoneService) { }

    ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
    this.resetForm();
    }

    loadForm() {
    this.ticketForm = this._formBuilder.group({
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

    openNew() {
    this.submitted = false;
    this.ticket_typeDialog = true;
    this.main.event = null;
    this.resetForm();
    }

    hideDialog(){
    this.ticket_typeDialog = false;
    }

    onSubmitForm() {

    this.btnloading = true;

    if (this.ticketForm.invalid) {
    this.btnloading = false;
    return;
    }
    this.addNewticket_type(this.ticketForm.value);
    }

    addNewticket_type(ticket_type: TicketType) {

    this._service.saveTicketType(ticket_type).pipe(first())
    .subscribe({
    next: (response) => {
      this.resetForm();
      this.ticket_typeDialog = false;
      if (response.status) {
        this.eventChange.emit(response.status);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
      }else {
        this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
      }
    },
    error: (error) => {
      this.btnloading = false;
      console.log(error)
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
