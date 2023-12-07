import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { RoleListResponseDao } from '../domain/Dao/Roles/RoleListDao';
import { RolesOrUserRespDropDownDao } from '../domain/Dao/Roles/RolesDao';
import { NewRoleDto } from '../domain/Dto/Role/NewRoleDto';
import { UpdateRoleDto } from '../domain/Dto/Role/UpdateRoleDto';

@Injectable()
export class RoleService {


    constructor(private http: HttpClient) { }

    getAllRoles(pageIndex: number, pageSize: number, globalFilter: string, sortField: string, sortOrder: number) {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminRoles/list?pageSize=${pageSize}&PageNumber=${pageIndex}&sortField=${sortField}&sortOrder=${sortOrder}&globalFilter=${globalFilter}`)
            .toPromise()
            .then(res => res as RoleListResponseDao)
            .then(data => data.data)
    }

    saveRole(role: NewRoleDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminRoles/save`, role);
    }

    updateRole(role: UpdateRoleDto) {
        return this.http.post<any>(`${environment.apiUrl}/api/v2/AdminRoles/update`, role);
    }

    getRoles() {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminRoles/load-dropdown`).toPromise()
            .then(res => res as RolesOrUserRespDropDownDao)
            .then(data => data.data)
    }

    getUserByRoleId(roleId: string) {
        return this.http.get(`${environment.apiUrl}/api/v2/AdminRoles/roles/${roleId}/users`)
            .toPromise()
            .then(res => res as RolesOrUserRespDropDownDao)
            .then(data => data.data)
    }
}
