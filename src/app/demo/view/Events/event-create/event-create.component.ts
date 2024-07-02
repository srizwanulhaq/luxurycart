import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';
import { ProjectEventService } from 'src/app/demo/service/project-event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
saveProjecteventForm: FormGroup;
iotDialog: any;
Time_field
  btnloading: boolean=false;
  projectList: any;
  
  constructor(private _formBuilder:FormBuilder,
    private service:ProjectEventService
    ,private observer :NamedObservableService, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.saveProjecteventForm = this._formBuilder.group({
      Project_Id:['',Validators.required],
      Name:['',Validators.required],
      Time:['',Validators.required],
      Ticket_Available:['',Validators.required],
      Ticket_Limit:['',Validators.required],
      Ticket_Used:[''],
    });
    this.service.getProjectDD().subscribe(res=>{
      this.projectList=res?.data;
    })
  }
  openNew() {
    this.reset();
    this.iotDialog = true;
  }
  reset(){
    this.saveProjecteventForm.reset();
  }
  onSubmitProjecteventForm() {
    if (this.saveProjecteventForm.valid) {
      var payload = this.saveProjecteventForm.value;;
      payload.Project_Id = payload.Project_Id.value;
      payload.Ticket_Used = payload.Ticket_Used==null ? 0 : payload.Ticket_Used;
      payload.Time = moment(payload.Time).format('YYYY-MM-DDTHH:mm:ss') //new Date(payload.Time); 
      this.btnloading=true;
      this.service.createProjectEvent(this.saveProjecteventForm.value).subscribe(res=>{
        this.observer.register("callProjectEventList");
        this.observer.updateValue("callProjectEventList",true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Created Successfully' });
        this.btnloading=false;
        this.iotDialog = false;
      },err=>{
        
        this.btnloading=false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      })
    }else{
      this.btnloading=false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid' });
    }
  }

}
