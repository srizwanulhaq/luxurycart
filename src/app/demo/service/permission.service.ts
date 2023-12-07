import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PermissionListDao } from "../domain/Dao/Permission/PermissionListDao";

@Injectable()
export class PermissionService {
    
    constructor(private http: HttpClient) { }

    getAllPermission(roleId:string) {
        return this.http.get(`${environment.apiUrl}/api/v1/AdminPermission/list?roleId=`+roleId)
        .toPromise()
        .then(res => res as PermissionListDao)
        .then(data => data.data)
    }

    getAllUserPermission(userId: string) {
        return this.http.get(`${environment.apiUrl}/api/v1/AdminUserPermission/list?userId=`+userId)
        .toPromise()
        .then(res => res as PermissionListDao)
        .then(data => data.data)
    }

    Update(updatePermission: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminPermission/toggle-update`,updatePermission);
    }

    
}
