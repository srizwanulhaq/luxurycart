import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/demo/domain/Dao/Projects/projects';
import { Projectdto } from 'src/app/demo/domain/Dto/Project/projectdto';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent implements OnInit {

  event: Event;
  project:Projects;
  editPanelClick: boolean;
  editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditProjectData: Projects){

    this.project = EditProjectData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
  onBottomPanelButtonClick(event,project:Projects){
    this.project = project;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
