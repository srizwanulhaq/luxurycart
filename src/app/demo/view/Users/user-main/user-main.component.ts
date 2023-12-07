import { Component, OnInit } from '@angular/core';
import { UsersDao } from 'src/app/demo/domain/Dao/User/UsersDao';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  user: UsersDao;
  userEdit: UsersDao;
  editPanelActive: boolean;
  editPanelClick: boolean;
  event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  onBottomPanelButtonClick(event, user) {
    this.user = user;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

  onEditPanelButtonClick(event, userEdit){
    this.userEdit = userEdit;
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
