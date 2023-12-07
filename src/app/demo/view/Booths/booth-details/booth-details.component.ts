import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoothDto } from 'src/app/demo/domain/Dto/Booth/BoothDto';
import { BoothMainComponent } from '../booth-main/booth-main.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BoothService } from 'src/app/demo/service/booth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-booth-details',
  templateUrl: './booth-details.component.html',
  styleUrls: ['./booth-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class BoothDetailsComponent implements OnInit {

  private _details: BoothDto;
  constructor( public main: BoothMainComponent,
               private service: BoothService,
              private messageService: MessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
  set details(value: BoothDto) {
      if (value) {
          this._details = value;
      }

  }

  get details(): BoothDto {
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
