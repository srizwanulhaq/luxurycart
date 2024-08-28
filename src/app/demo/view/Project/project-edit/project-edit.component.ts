import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
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
import { CityCountryDropdown, Citydao2, ProjectStatus } from 'src/app/demo/domain/Dao/Zone/AllDropDowndao2';
import { VehicleTypeDropDown } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers:[MessageService,DatePipe]
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
  vehicleType:VehicleTypeDropDown[];
  lstcities:Citydao2[];
  Status:ProjectStatus[];
  dropdown:CityCountryDropdown;
  setStartDate: Date | null = null;
  setEndDate: Date | null = null;
  dateError: boolean = false;
  constructor(public main: ProjectMainComponent,
    private _Userservice: UserService,
    private _formBuilder: FormBuilder,
    private service: ProjectsService,
    private messageService: MessageService,
  private cdref:ChangeDetectorRef,private datepipe: DatePipe) { }

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
        end_Date: ["",[Validators.required]],
      start_Date: ["",[Validators.required]],
      status: ["",[Validators.required]],
        vehicletypeId:[[]],
    });   
     this.Status = [
      { label: "Active", value: "Active" },
      { label: "Completed", value: "Completed" },
      { label: "On Hold", value: "On Hold" },
      { label: "Canceled", value: "Canceled" }
  ];
  }
  onStartDateSelect(event: any) {
    this.setStartDate = event;
    this.validateDates();
  }

  onEndDateSelect(event: any) {
    this.setEndDate = event;
    this.validateDates();
  }
  validateDates() {
    if (this.setEndDate && this.setStartDate && this.setEndDate < this.setStartDate) {
      this.dateError = true;  // Show error message
    } else {
      this.dateError = false; // Hide error message
    }
  }
  loadDropDown() {
    
    this.service.getCityCountryDropdown().then(res => {
      this.dropdown = res;
    });
    this.service.getVehicleTypeDropdown().subscribe(resp => {
      if (resp.status) {
          this.vehicleType = resp.data;
      }});
  }
  onSelect(event)
  {
    this.lstcities  = this.dropdown.citylist.filter(x=>x.country_Id==event.value);
  }
  ngOnChanges(change: SimpleChange) {
    debugger;
    if (!!change['editProjectData'].currentValue) {
      
        const temp = change['editProjectData'].currentValue
        console.log(temp);
        this.lstcities = this.dropdown.citylist.filter(x=>x.country_Id ===temp.city.country_Id);
        const group: FormGroup = this.ProjectUpdateForm as FormGroup;
        group.controls['title'].setValue(temp.title || "");
        group.controls['artitle'].setValue(temp.arTitle || "");
        group.controls['id'].setValue(temp.id || "");
        group.controls['city_Id'].setValue(temp.city_Id || "");
        this.setStartDate=new Date(temp.start_Date|| "");
        this.setEndDate=new Date(temp.end_Date|| "");
        group.controls['start_Date'].setValue(new Date(temp.start_Date) || "");
        group.controls['end_Date'].setValue(new Date(temp.end_Date) || "");
        group.controls['status'].setValue(temp.status || "");
        group.controls['country_Id'].setValue(temp.city.country_Id || "");
        var vehIds=[];
        temp.lstVehicleTypes.forEach(element => {
          vehIds.push(element.vehicle_Type.id)
        });
        group.controls['vehicletypeId'].setValue(vehIds || "");
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
    debugger;
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
  setDateFormat(date: Date): string {
    return this.datepipe.transform(date, "yyyy-MM-dd HH:mm:00")
}
  resetForm(){
    this.ProjectUpdateForm.reset();
    this.btnLoading = false;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
