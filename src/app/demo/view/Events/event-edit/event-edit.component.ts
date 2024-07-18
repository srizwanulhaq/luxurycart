import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';
import { ProjectEventService } from 'src/app/demo/service/project-event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  saveProjecteventForm: FormGroup;
  iotEitDialog: any;
  Time_field
    btnloading: boolean=false;
    projectList: any;
    bindingV
    
    constructor(private _formBuilder:FormBuilder,
      private service:ProjectEventService
      ,private observer :NamedObservableService, private messageService: MessageService) { }
    
    ngOnInit(): void {
      this.saveProjecteventForm = this._formBuilder.group({
        Id:['',Validators.required],
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

      this.observer.getObservable("callProjectEventUpdate").subscribe(observer=>{
        if (observer) {
          this.iotEitDialog=true;
          this.setValues(observer);
        }
      });

    }
    ngOnChanges(change: SimpleChange) {

    }
    openNew() {
      this.reset();
      this.iotEitDialog = true;
    }
    setValues(observer){
      const date = new Date(observer?.projectEvent?.time);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      var formattedTime = `${this.pad(hours)}:${this.pad(minutes)}`;
      console.log("🚀 ~ EventEditComponent ~ setValues ~ formattedTime:", formattedTime)
      this.saveProjecteventForm.controls['Id'].setValue(observer?.projectEvent?.id);
      this.saveProjecteventForm.controls['Project_Id'].setValue(observer?.projectEvent?.project_Id);
      this.saveProjecteventForm.controls['Name'].setValue(observer?.projectEvent?.name);
      this.saveProjecteventForm.controls['Time'].setValue(new Date(observer?.projectEvent?.time));
      this.saveProjecteventForm.controls['Ticket_Available'].setValue(observer?.projectEvent?.ticket_Available || 0);
      this.saveProjecteventForm.controls['Ticket_Limit'].setValue(observer?.projectEvent?.ticket_Limit);
      //this.saveProjecteventForm.controls['Ticket_Used'].setValue(observer?.projectEvent?.ticket_Used);
      this.bindingV =  this.projectList?.find((a)=>{
        return a.value == observer?.projectEvent?.project_Id;
      }) 

    }
    pad(num: number): string {
      return num < 10 ? '0' + num : num.toString();
    }
    reset(){
      this.saveProjecteventForm.reset();
    }
    onSubmitProjecteventForm() {
      if (this.saveProjecteventForm.valid) {
        var payload = this.saveProjecteventForm.value;;
        payload.Project_Id = payload.Project_Id.value;
        //payload.Ticket_Used = payload.Ticket_Used==null ? 0 : payload.Ticket_Used;
        payload.Time = moment(payload.Time).format('YYYY-MM-DDTHH:mm:ss') //new Date(payload.Time); 
        this.btnloading=true;
        this.service.updateProjectEvent(this.saveProjecteventForm.value).subscribe(res=>{
          this.observer.register("callProjectEventList");
          this.observer.updateValue("callProjectEventList",true);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Updated Successfully' });
          this.btnloading=false;
          this.iotEitDialog = false;
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
