import { Component, Input, OnInit } from '@angular/core';
import { RolesDao } from 'src/app/demo/domain/Dao/Roles/RolesDao';
import { RoleMainComponent } from '../role-main/role-main.component';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  private _details:RolesDao;

  
  constructor(public main: RoleMainComponent) { }
  
  ngOnInit(): void {
  }

  @Input() 
  set details(value: RolesDao) {
    if (value) {
      this._details = value;
    }
  }

  get details(): RolesDao {
    return this._details;
  }

}
