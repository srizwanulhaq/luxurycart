import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { EventTicketTypeDto } from 'src/app/demo/domain/Dto/Event-Ticket-Type/event-ticket-type-dto';
import { EventTicketTypeService } from 'src/app/demo/service/event-ticket-type.service';
import { EventTicketTypeMainComponent } from '../event-ticket-type-main/event-ticket-type-main.component';

@Component({
  selector: 'app-add-new-event-ticket-type',
  templateUrl: './add-new-event-ticket-type.component.html',
  styleUrls: ['./add-new-event-ticket-type.component.scss'],
  providers:[MessageService]
})
export class AddNewEventTicketTypeComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  event_ticket_typedto: EventTicketTypeDto;
  Dialog: boolean;
  submitted: boolean;
  EventTicketTypeForm:FormGroup;
  btnloading: boolean = false;;
  constructor(private _service: EventTicketTypeService,
    private _formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private main: EventTicketTypeMainComponent,
    private messageService: MessageService) { }
  ngOnInit(): void {
    
    this.loadForm();
    this.resetForm();
  }
 
  loadForm() {
    this.EventTicketTypeForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      price: [0.0, [Validators.required]]
    });
    
  }
 
  openNew() {
    this.submitted = false;
    this.Dialog = true;
    this.main.event = null;
    this.resetForm();
  }
  
  hideDialog(){
    this.Dialog = false;
  }

  onSubmitForm() {

    this.btnloading = true;
    
    if (this.EventTicketTypeForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.addNew(this.EventTicketTypeForm.value);
  }
  
  addNew(event_ticket_type: EventTicketTypeDto) {
    
    this._service.save(event_ticket_type).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.Dialog = false;
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
    this.EventTicketTypeForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
