import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewRoleDto } from 'src/app/demo/domain/Dto/Role/NewRoleDto';
import { RoleService } from 'src/app/demo/service/role.service';
import { RoleMainComponent } from '../role-main/role-main.component';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  role: NewRoleDto;
  roleDialog: boolean;
  submitted: boolean;
  roleForm;
  btnloading: boolean = false;
  @Output() eventChange = new EventEmitter<Event>();

  constructor(private _formBuilder: FormBuilder,
              private _service: RoleService,
              private main: RoleMainComponent,
              private messageService: MessageService,
              private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadForm();
    this.resetForm();
  }
 
  loadForm() {
    this.roleForm = this._formBuilder.group({
      name: ["", [Validators.required]],
    });
  }

  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
    this.main.event = null;
    this.resetForm();
  }
  
  hideDialog(){
    this.roleDialog = false;
  }

  onSubmitForm() {
    this.btnloading = true;
    
    if (this.roleForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.addNewRole(this.roleForm.value);
  }

  addNewRole(role: NewRoleDto) {
   
    this._service.saveRole(role).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.roleDialog = false;
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
    this.roleForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
