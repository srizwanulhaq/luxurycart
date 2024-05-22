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
import { CityCountryDropdown, Citydao2 } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import { VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';

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
  dropdown:CityCountryDropdown;
  submitted: boolean;
  projectForm:FormGroup;
  lstcities:Citydao2[];
  btnloading: boolean = false;
  vehicleType:VehicleTypeDropDown[];
  constructor(private _service: ProjectsService,
    private _Userservice: UserService,
    private _formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private main: ProjectMainComponent,
    private messageService: MessageService) { }
  ngOnInit(): void {
    
    this.loadDropDown();
    this.loadForm();
    this.resetForm();
  }
 
  loadForm() {
    this.projectForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      artitle: ["", [Validators.required]],
      city_Id: ["",[Validators.required]],
      country_Id: ["",[Validators.required]],
      vehicletypeId:[[]],
    });
    
  }
  onSelect(event)
  {
    this.lstcities  = this.dropdown.citylist.filter(x=>x.country_Id==event.value);
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
  loadDropDown() {
    
    this._service.getCityCountryDropdown().then(res => {
      
      this.dropdown = res;
    });
    this._service.getVehicleTypeDropdown().subscribe(resp => {
      if (resp.status) {
          this.vehicleType = resp.data;
      }});
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
