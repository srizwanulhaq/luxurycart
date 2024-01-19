import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectMainComponent } from '../project-main/project-main.component';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { first } from 'rxjs/operators';
import { Projects } from 'src/app/demo/domain/Dao/Projects/projects';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class ProjectDetailsComponent implements OnInit {

  private _details: Projects;
  constructor( public main: ProjectMainComponent,
               private service: ProjectsService,
              private messageService: MessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
  set details(value: Projects) {
      if (value) {
          this._details = value;
      }

  }

  get details(): Projects {
      return this._details;
  }

  onStatus(e, id) {
    var active = e.checked;
    this.confirmService.confirm({
      message: "Do you want to change status?",
      header: "Change Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        //-------------------------------------
        var model = {
          id: id,
          active: active,
        };
        this.service
          .changeStatus(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
            },
            error: (error) => {
                this.main.bottomPanelActive = true;
                this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
   
      },
      reject: () => {
        this.details.active = !active;
      },
    });
  }
}
