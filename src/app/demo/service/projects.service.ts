import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectResponse, SimpleProjectDao } from '../domain/Dao/Projects/projects';
import { UserFormDao } from '../domain/Dao/User/UserFormDao';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  requestDataFromMultipleSources() 
  {
    return this.http.get(`${environment.apiUrl}/api/v1/AdminProject/dropdowns/load-values`)
        .toPromise()
        .then(res => res as UserFormDao)
        .then(data => data.data);
  }

  getProjectDropdowns() {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProject/project-load`, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    }).toPromise().then(data => data.data.result as SimpleProjectDao[]);
  }

  getAllProject(pageIndex: number, pageSize: number, globalFilter: string,
    sortField: string, sortOrder: number, dateRangeStr: string) {

   return this.http.get<any>(`${environment.apiUrl}/api/v1/AdminProject/get?pageSize=${pageSize}&PageNumber=${pageIndex}&globalFilter=${globalFilter}&sortField=${sortField}&sortOrder=${sortOrder}&${dateRangeStr}`)
  .toPromise()
  .then(res => res as ProjectResponse)
  .then(data => data.data);
 }
 saveProjects(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProject/save`, model);
}
updateProjects(model:any) {
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProject/update`, model);
}

changeStatus(model:any)
{
  return this.http.post<any>(`${environment.apiUrl}/api/v1/AdminProject/active/deactive`,model);
}
}
