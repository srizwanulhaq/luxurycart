import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProjectResponse } from '../domain/Dao/Projects/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }


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
