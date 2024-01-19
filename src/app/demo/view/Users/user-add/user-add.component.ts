import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem, MessageService, SelectItemGroup } from 'primeng/api';
import { first } from 'rxjs/operators';
import { DynamicDatatypeDto, DynamicTypeDto } from 'src/app/demo/domain/Dao/DynamicPermission/DynamicPermissionDao';
import { NewUserDto } from 'src/app/demo/domain/Dto/Users/NewUserDto';
import { UserService } from 'src/app/demo/service/user.service';
import { UserMainComponent } from '../user-main/user-main.component';
import { DynamicDataEnum } from '../../../domain/Enums/DynamicDataEnums';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  user: NewUserDto;
  userDialog: boolean;
  submitted: boolean;
  userForm;
  btnloading: boolean = false;
  @Output() eventChange = new EventEmitter<Event>();

  lstRoles: SelectItem[] = [];
  lstAccounts: SelectItem[] = [];
  lstUsers: SelectItem[] = [];
  
  roleId: string;
  subAccountId:string;
  parentId: string;

  lstDynamictype: DynamicTypeDto[];
 

  groupedVehicles: SelectItemGroup[];
  groupedZones: SelectItemGroup[];
  groupedProjects: SelectItem[];
  selectedVehicles:SelectItem[];
  selectedZones:SelectItem[];
  
  constructor(private _formBuilder: FormBuilder,
              private _service: UserService,
              private main: UserMainComponent,
              private messageService: MessageService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadDropdownValues();
    this.resetForm();
  }
 
  loadForm() {
    this.userForm = this._formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      subAccountId: ["", [Validators.required]],
      parentId: [""],
      selectedVehicles: [""],
      selectedZones: [""],
      selectedProjects: [""]
    });
    
  }

  loadDropdownValues() {
    //get role list
    this._service.requestDataFromMultipleSources().then(responseList => {
    
      this.lstRoles = responseList.result.lstRoles
      this.lstRoles.sort((a, b) => a.label.localeCompare(b.label));
      this.lstAccounts = responseList.result.lstSubAccounts;
      this.lstUsers = responseList.result.lstUsers;
      this.lstUsers.sort((a,b) => a.label.localeCompare(b.label))
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

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
    this.main.event = null;
    this.resetForm();
  }
  
  hideDialog(){
    this.userDialog = false;
  }

  onSubmitForm() {

    this.btnloading = true;
    
    if (this.userForm.invalid) {
      this.btnloading = false;
      return;
    }
    this.addNewUser(this.userForm.value);
  }

  addNewUser(user: NewUserDto) {
    
    this._service.saveUser(user).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.userDialog = false;
            if (response.status) {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            }else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
          },
          error: (error) => {
            this.btnloading = false;
            console.log(error)
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });
  }

  resetForm() {
    this.userForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
