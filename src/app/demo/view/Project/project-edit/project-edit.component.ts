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
import { CityCountryDropdown, Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';

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
  lstcities:Citydao2[];
  dropdown:CityCountryDropdown;
  constructor(public main: ProjectMainComponent,
    private _Userservice: UserService,
    private _formBuilder: FormBuilder,
    private service: ProjectsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadDropDown();
    
    this.loadForm();
  }

  loadForm() {
    this.ProjectUpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        title: ["", [Validators.required]],
        artitle: ["", [Validators.required]],
        city_Id:["",[Validators.required]],
        country_Id:["",[Validators.required]],
        
    });  
  }
  
  loadDropDown() {
    
    this.service.getCityCountryDropdown().then(res => {
      this.dropdown = res;
    })
  }
  onSelect(event)
  {
    this.lstcities  = this.dropdown.citylist.filter(x=>x.country_Id==event.value);
  }
  ngOnChanges(change: SimpleChange) {
    
    if (!!change['editProjectData'].currentValue) {
      
        const temp = change['editProjectData'].currentValue
        this.lstcities = this.dropdown.citylist.filter(x=>x.country_Id ===temp.city.country_Id);
        const group: FormGroup = this.ProjectUpdateForm as FormGroup;
        group.controls['title'].setValue(temp.title || "");
        group.controls['artitle'].setValue(temp.arTitle || "");
        group.controls['id'].setValue(temp.id || "");
        group.controls['city_Id'].setValue(temp.city_Id || "");
        group.controls['country_Id'].setValue(temp.city.country_Id || "");
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.ProjectUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
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
