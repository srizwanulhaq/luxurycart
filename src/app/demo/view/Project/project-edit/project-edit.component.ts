import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { ProjectMainComponent } from '../project-main/project-main.component';
import { Projectdto } from 'src/app/demo/domain/Dto/Project/projectdto';
import { DynamicTypeDto } from 'src/app/demo/domain/Dao/DynamicPermission/DynamicPermissionDao';
import { UserService } from 'src/app/demo/service/user.service';
import { DynamicDataEnum } from 'src/app/demo/domain/Enums/DynamicDataEnums';
import { first } from 'rxjs/operators';
import { Projects } from 'src/app/demo/domain/Dao/Projects/projects';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers:[MessageService]
})
export class ProjectEditComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  @Input() editProjectData: Projects;
  submitted:boolean;
  ProjectUpdateForm: FormGroup;
  btnLoading:boolean;
  lstDynamictype: DynamicTypeDto[];
  groupedZones: SelectItemGroup[];
  selectedZones:SelectItem[];
  constructor(public main: ProjectMainComponent,
    private _Userservice: UserService,
    private _formBuilder: FormBuilder,
    private service: ProjectsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadDropdown();
    
    this.loadForm();
  }

  loadForm() {
    this.ProjectUpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        title: ["", [Validators.required]],
        artitle: ["", [Validators.required]],
        lstZone:[[],[Validators.required]],
    });  
  }
  
  loadDropdown() {
    
    this.groupedZones = [];
    //get role list
    this.service.requestDataFromMultipleSources().then(responseList => {
    
      this.lstDynamictype = responseList.dynVal.lstDynamicTypeDto;
      
      this.lstDynamictype.forEach(type => {
        
        if(type.number != DynamicDataEnum.Vehicles)
        {
          
          
          type.lstDynamicTypeData.forEach(ele=>{
            var lstData : SelectItem[] = [];
            
            ele.lstDynamicData.forEach(element => {
              lstData.push({ label: element.title, value: element.id });
              
            });
            
            this.groupedZones.push({ label: ele.title, value: ele.id, items: lstData});  
            
          }); 
            
        }
      })
    });
  }
  ngOnChanges(change: SimpleChange) {
    let id=[];
    if (!!change['editProjectData'].currentValue) {
      
        const temp = change['editProjectData'].currentValue
        
        const group: FormGroup = this.ProjectUpdateForm as FormGroup;
        group.controls['title'].setValue(temp.title || "");
        group.controls['artitle'].setValue(temp.arTitle || "");
        group.controls['id'].setValue(temp.id || "");
        //group.controls['projectTypeId'].setValue(temp.conciergeprojectTypes.id || "");
        
        if(temp.lstZones.length>0)
        {
        temp.lstZones.forEach(element => {
          id.push(element.id);
        });
        }
        else{
        id=null;
        }
        group.controls['lstZone'].setValue(id || []);
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.ProjectUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    if(this.ProjectUpdateForm.value.lstZone != null || this.ProjectUpdateForm.value.lstZone.length > 0 )
    this.Updateproject(this.ProjectUpdateForm.value);
  }
  Updateproject(project) 
  {
    this.service.updateProjects(project).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.main.editPanelActive = false;
                this.main.bottomPanelActive=false;
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
    this.ProjectUpdateForm.reset();
    this.btnLoading = false;
  }
  
}
