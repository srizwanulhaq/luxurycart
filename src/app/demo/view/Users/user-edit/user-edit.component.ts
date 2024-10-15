import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import { first } from 'rxjs/operators';
import { DynamicTypeDto } from 'src/app/demo/domain/Dao/DynamicPermission/DynamicPermissionDao';
import { UsersDao } from 'src/app/demo/domain/Dao/User/UsersDao';
import { EditUserDto } from 'src/app/demo/domain/Dto/Users/EditUserDto';
import { DynamicDataEnum } from 'src/app/demo/domain/Enums/DynamicDataEnums';
import { UserService } from 'src/app/demo/service/user.service';
import { UserMainComponent } from '../user-main/user-main.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  private _details:UsersDao;
  editUser: EditUserDto;
  userEditDialog: boolean;
  submitted: boolean;
  userEditForm;
  btnloading: boolean = false;

  lstRoles: SelectItem[] = [];
  lstAccounts: SelectItem[] = [];
  lstUsers: SelectItem[] = [];
  getLstUsers: SelectItem[] = [];

  lstDynamictype: DynamicTypeDto[];

  groupedVehicles: SelectItemGroup[];
  groupedZones: SelectItemGroup[];

  selectedVehicles = [];
  selectedZones = [];
  selectedProjects = [];

  roleId: string;
  subAccountId:string;
  parentId: string;
  groupedProjects: SelectItem[];
  @Output() eventChange = new EventEmitter<Event>();
  
  constructor(private _service: UserService, 
              public main: UserMainComponent,
              private messageService: MessageService,
              private cdref: ChangeDetectorRef,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
  
  }
  
  loadForm() {
    this.userEditForm = this._formBuilder.group({
      userId: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.email]],
      password: [""],
      roleId: ["", [Validators.required]],
      subAccountId: ["", [Validators.required]],
      parentId: [""],
      selectedVehicles: [""],
      selectedZones: [""],
      selectedProjects: [""]
    });
  }

  loadDropdownValues() {
    this._service.requestDataFromMultipleSources().then(responseList => {
      this.lstRoles = responseList.result.lstRoles
      this.lstRoles.sort((a, b) => a.label.localeCompare(b.label));
      this.lstAccounts = responseList.result.lstSubAccounts;
      this.getLstUsers = responseList.result.lstUsers;
      this.getLstUsers.sort((a,b) => a.label.localeCompare(b.label))
      
      this.lstDynamictype = responseList.dynVal.lstDynamicTypeDto;

      this.lstDynamictype.forEach(type => {
        
        if(type.number == DynamicDataEnum.Vehicles)
        {
          this.groupedVehicles = [];
          type.lstDynamicTypeData.forEach(ele=>{
            var lstData : SelectItem[] = [];
            
            ele.lstDynamicData.forEach(element => {
              lstData.push({ label: element.title, value: element.id });
            });

            this.groupedVehicles.push({ label: ele.title, value: ele.id, items: lstData});  
          });
        }
        else if(type.number == DynamicDataEnum.Parking_Zones)
        {
          
          this.groupedZones = [];
          
          type.lstDynamicTypeData.forEach(ele=>{
            var lstData : SelectItem[] = [];
            
            ele.lstDynamicData.forEach(element => {
              lstData.push({ label: element.title, value: element.id });
            });
            
            this.groupedZones.push({ label: ele.title, value: ele.id, items: lstData});  

          });   
        }
        else 
        {
          
          this.groupedProjects = [];
          
          type.lstDynamicTypeData.forEach(ele=>{
            //var lstData : SelectItem[] = [];
            
            this.groupedProjects.push({ label: ele.title, value: ele.id });
            
          });   
        }
      })
    });
  }

  @Input() 
  set details(value: UsersDao) {
    if (value) {
      this.loadDropdownValues();
      this._details = value;
      this.resetForm();
      this.setValues();
     
    }
  }

  get details(): UsersDao {
    return this._details;
  }

  setValues() {
    if(this.details){
      this.lstUsers = this.getLstUsers.filter(z => z.label != this.details.email)
      this.userEditForm.controls.userId.setValue(this.details.id);
      this.userEditForm.controls.email.setValue(this.details.email);
      this.userEditForm.controls.subAccountId.setValue(this.details.subAccount.id);
      this.userEditForm.controls.roleId.setValue(this.details.roles.id);
      this.userEditForm.controls.parentId.setValue(this.details.parentId);
      this.selectedVehicles = [];
      this.selectedZones = [];
      this.selectedProjects = [];
      this.details.selectedVehicles.forEach(element => {
        this.selectedVehicles.push(element);
      });
      this.details.selectedZones.forEach(element => {
        this.selectedZones.push(element);
      });
      this.details.selectedProjects.forEach(element => {
        this.selectedProjects.push(element);
      });
      this.userEditForm.controls.selectedVehicles.setValue(this.selectedVehicles);
      this.userEditForm.controls.selectedZones.setValue(this.selectedZones);
      this.userEditForm.controls.selectedProjects.setValue(this.selectedProjects);
    }
  }

  onSubmitForm(){
    this.btnloading = true;
    if (this.userEditForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.updateVehicle(this.userEditForm.value);
  }
 
  updateVehicle(user: EditUserDto) {
    this._service.updateUser(user).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.userEditDialog = false;
            this.main.editPanelActive = false;
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
    this.userEditForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
