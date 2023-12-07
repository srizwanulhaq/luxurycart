import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { RolesDao } from 'src/app/demo/domain/Dao/Roles/RolesDao';
import { UpdateRoleDto } from 'src/app/demo/domain/Dto/Role/UpdateRoleDto';
import { RoleService } from 'src/app/demo/service/role.service';
import { RoleMainComponent } from '../role-main/role-main.component';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  private _details:RolesDao;
  editRole: UpdateRoleDto;
  roleEditDialog: boolean;
  submitted: boolean;
  roleEditForm;
  btnloading: boolean = false;
 
  
  @Output() eventChange = new EventEmitter<Event>();
  
  constructor(private _service: RoleService, 
              public main: RoleMainComponent,
              private messageService: MessageService,
              private cdref: ChangeDetectorRef,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
    
  }
  
  loadForm() {
    this.roleEditForm = this._formBuilder.group({
      id : ["", [Validators.required]],
      name: ["", [Validators.required]],
    });
  }


  @Input() 
  set details(value: RolesDao) {
    if (value) {
      this._details = value;
      this.resetForm();
      this.setValues();
    }
  }

  get details(): RolesDao {
    return this._details;
  }

  setValues() {
    if(this.details){
      this.roleEditForm.controls.id.setValue(this.details.id);
      this.roleEditForm.controls.name.setValue(this.details.name);
    }
  }

  onSubmitForm(){
    this.btnloading = true;
    if (this.roleEditForm.invalid) {
      this.btnloading = false;
      return;
    }
   
    this.updateVehicle(this.roleEditForm.value);
  }

  updateVehicle(role: UpdateRoleDto) {
    this._service.updateRole(role).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.roleEditDialog = false;
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
    this.roleEditForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
