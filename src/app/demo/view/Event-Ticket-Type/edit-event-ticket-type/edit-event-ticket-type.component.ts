import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EventTicketType } from 'src/app/demo/domain/Dao/Event-Ticket-Type/event-ticket-type-dao';
import { EventTicketTypeDto } from 'src/app/demo/domain/Dto/Event-Ticket-Type/event-ticket-type-dto';
import { EventTicketTypeMainComponent } from '../event-ticket-type-main/event-ticket-type-main.component';
import { EventTicketTypeService } from 'src/app/demo/service/event-ticket-type.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-event-ticket-type',
  templateUrl: './edit-event-ticket-type.component.html',
  styleUrls: ['./edit-event-ticket-type.component.scss'],
  providers:[MessageService]
})
export class EditEventTicketTypeComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  @Input() editData: EventTicketType;
  submitted:boolean;
  UpdateForm: FormGroup;
  btnLoading:boolean;

  constructor(public main: EventTicketTypeMainComponent,
    private _formBuilder: FormBuilder,
    private service: EventTicketTypeService,
    private messageService: MessageService,
  private cdref:ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.loadForm();
  }

  loadForm() {
    this.UpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        name: ["", [Validators.required]],
        price: [0.0, [Validators.required]]
        
    });  
  }
  
  ngOnChanges(change: SimpleChange) {
    
    if (!!change['editData'].currentValue) {
      
        const temp = change['editData'].currentValue
        const group: FormGroup = this.UpdateForm as FormGroup;
        group.controls['name'].setValue(temp.name || "");
        group.controls['price'].setValue(temp.price || 0.0);
        group.controls['id'].setValue(temp.id || "");
        
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.UpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    this.Updateproject(this.UpdateForm.value);
  }
  Updateproject(event_ticket_type) 
  {
    this.service.update(event_ticket_type).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.main.editPanelActive = false;
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
    this.UpdateForm.reset();
    this.btnLoading = false;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
