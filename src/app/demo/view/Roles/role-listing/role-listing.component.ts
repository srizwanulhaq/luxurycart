import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Permission, PermissionModule } from 'src/app/demo/domain/Dao/Permission/PermissionListDao';
import { RolesDao } from 'src/app/demo/domain/Dao/Roles/RolesDao';
import { ModulesListDao } from 'src/app/demo/domain/Dao/Modules/ModulesListDao';
import { PermissionService } from 'src/app/demo/service/permission.service';
import { RoleService } from 'src/app/demo/service/role.service';
import { RoleMainComponent } from '../role-main/role-main.component';
import { UpdatePermissionDto } from 'src/app/demo/domain/Dto/Permission/UpdatePermissionDto';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-role-listing',
    templateUrl: './role-listing.component.html',
    styleUrls: ['./role-listing.component.scss']
})
export class RoleListingComponent implements OnInit {

    roles: RolesDao[];
    lstRoles: SelectItem[] = [];
    selectedRole: SelectItem;
    lstUsers: SelectItem[] = [];
    selectedUser: SelectItem;
    rowsPerPageOptions = [10, 25, 50];
    totalRecords: number;
    loading: boolean = false;
    searchValue: any;
    event_status: any;
    modules: ModulesListDao[];
    selectedModule: ModulesListDao;
    PermissionModule: PermissionModule[];
    Permission: Permission[];
    @Output() eventChange = new EventEmitter<Event>();
    @ViewChild(Table, { static: false }) tableEvent;

    updatePermission: UpdatePermissionDto;

    constructor(public main: RoleMainComponent, private messageService: MessageService, private service: RoleService, private permService: PermissionService, private cdref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadRolesDropdown();
    }

    loadRolesDropdown() {
        this.service.getRoles().then(data => {
            this.lstRoles = data;
            this.getPermissions(this.lstRoles[0].value)
        });
    }

    getUsersByRole(role_id: string) {
        this.selectedUser = undefined
        this.service.getUserByRoleId(role_id).then(data => {
            this.lstUsers = data
        })
    }

    getPermissions(roleId: string) {
        this.permService.getAllPermission(roleId).then(data => {
            this.PermissionModule = data.modules;
            this.modules = [];
            this.Permission = [];
            this.PermissionModule.forEach(element => {
                this.modules.push({ code: element.id, name: element.title });
            });
            this.Permission = this.PermissionModule[0].permission;
            this.selectedModule = this.modules[0];
        }
        );
    }

    getUserPermissions(userId: string) {
        this.permService.getAllUserPermission(userId).then(data => {
            this.PermissionModule = data.modules;
            this.modules = [];
            this.Permission = [];
            if (!!this.PermissionModule) {
                this.PermissionModule.forEach(element => {
                    this.modules.push({ code: element.id, name: element.title });
                });
                this.Permission = this.PermissionModule[0].permission;
                this.selectedModule = this.modules[0];
            }
        }
        );
    }

    changeRole() {
        // this.getUsersByRole(this.selectedRole.value)
        this.getPermissions(this.selectedRole.value)
    }

    changeUser() {
        this.getUserPermissions(this.selectedUser.value);
        //this.Permission = this.PermissionModule.find(mod => mod.id == this.selectedModule.code).permission;
    }

    onChangeModule(code: string) {
        this.Permission = this.PermissionModule.find(mod => mod.id == code).permission;
    }

    onPermissionChange(permission) {
        this.updatePermission = { moduleId: this.selectedModule.code, roleId: this.selectedRole.value, permission: permission };
        this.permService.Update(this.updatePermission).pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.status) {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }

    // loadRoles(event: LazyLoadEvent) {
    //   this.loading = true;
    //   this.event_status = event;
    //   setTimeout(() => {
    //       this.service.getAllRoles(event.first / event.rows + 1,
    //       event.rows,
    //       event.globalFilter ?? this.searchValue,
    //       event.sortField,
    //       event.sortOrder).then(res => {
    //           this.roles = res.results
    //           console.log(this.roles);
    //           this.totalRecords = res.rowCount;
    //           this.loading = false;
    //       })
    //   }, 1000);
    // }

    // resetDataTable(dt) {
    //   localStorage.removeItem("lstRoles-local");
    //   dt.reset();
    //   this.searchValue = null;
    // }

    // @Input()
    // set event(event: Event) {
    //   if (event) {
    //     this.loadRoles(this.tableEvent);
    //   }
    // }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

}


