import { Component, OnInit } from '@angular/core';
import { RolesDao } from 'src/app/demo/domain/Dao/Roles/RolesDao';

@Component({
  selector: 'app-role-main',
  templateUrl: './role-main.component.html',
  styleUrls: ['./role-main.component.scss']
})
export class RoleMainComponent implements OnInit {

  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
 
  editPanelActive: boolean;
  editPanelClick: boolean;
  event: Event;

  role: RolesDao;
 

  constructor() { }

  ngOnInit(): void {
  }

  onBottomPanelButtonClick(event, user) {
    this.role = user;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

  onEditPanelButtonClick(event, roleEdit){
    this.role = roleEdit;
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    this.bottomPanelActive = false;
    event.preventDefault();
    this.event = null;
  }

  onBottomPanelClick() {
    this.bottomPanelClick = true;
  }

  onChange(event){
    this.event = event;
  }

}
