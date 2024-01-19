import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { DynamicTypeDto } from 'src/app/demo/domain/Dao/DynamicPermission/DynamicPermissionDao';
import { DynamicDataEnum } from 'src/app/demo/domain/Enums/DynamicDataEnums';
import { UserService } from 'src/app/demo/service/user.service';
import { ProjectMainComponent } from '../project-main/project-main.component';
import { Projectdto } from 'src/app/demo/domain/Dto/Project/projectdto';
import { first } from 'rxjs/operators';
import { ProjectsService } from 'src/app/demo/service/projects.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  providers:[MessageService]
})
export class ProjectCreateComponent implements OnInit {
  
  @Output() eventChange = new EventEmitter<Event>();
  lstDynamictype: DynamicTypeDto[];
  project: Projectdto;
  projectDialog: boolean;
  submitted: boolean;
  projectForm:FormGroup;
  btnloading: boolean = false;
  groupedZones: SelectItemGroup[];
  selectedZones:SelectItem[];
  constructor(private _service: ProjectsService,
    private _Userservice: UserService,
    private _formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private main: ProjectMainComponent,
    private messageService: MessageService) { }
  ngOnInit(): void {
    
    this.loadDropdownValues();
    this.loadForm();
    this.resetForm();
  }
  loadDropdownValues() {
    
    this.groupedZones = [];
    //get role list
    this._service.requestDataFromMultipleSources().then(responseList => {
    
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
  loadForm() {
    this.projectForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      artitle: ["", [Validators.required]],
      lstZone: [[],[Validators.required]],
    });
    
  }
  openNew() {
    this.submitted = false;
    this.projectDialog = true;
    this.main.event = null;
    this.resetForm();
  }
  
  hideDialog(){
    this.projectDialog = false;
  }

  onSubmitForm() {

    this.btnloading = true;
    
    if (this.projectForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.addNewUser(this.projectForm.value);
  }

  addNewUser(project: Projectdto) {
    
    this._service.saveProjects(project).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.projectDialog = false;
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
    this.projectForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
