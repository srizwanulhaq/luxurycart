import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { Points } from 'src/app/demo/domain/Dao/Tours/points';
import { PointsMainComponent } from '../points-main/points-main.component';
import { PointsService } from 'src/app/demo/service/points.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-points-details',
  templateUrl: './points-details.component.html',
  styleUrls: ['./points-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class PointsDetailsComponent implements OnInit {

  private _details: Points;
  constructor( public main: PointsMainComponent,
               private service: PointsService,
              private messageService: MessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
  set details(value: Points) {
      if (value) {
          this._details = value;
      }

  }

  get details(): Points {
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
