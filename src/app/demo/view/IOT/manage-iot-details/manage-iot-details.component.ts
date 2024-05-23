import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IotListDAO } from 'src/app/demo/domain/Dao/IOT/IOTdao';
import { ManageIotService } from 'src/app/demo/service/manage-iot.service';
import { ManageIotMainComponent } from '../manage-iot-main/manage-iot-main.component';
import { first } from "rxjs/operators";
@Component({
  selector: 'app-manage-iot-details',
  templateUrl: './manage-iot-details.component.html',
  styleUrls: ['./manage-iot-details.component.scss']
})
export class ManageIotDetailsComponent implements OnInit {

  private _details:IotListDAO;
  
  constructor(public main: ManageIotMainComponent,
    private messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _manageIotService: ManageIotService) { }
  
  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input() 
  set details(value: IotListDAO) {
    if (value) {
      this._details = value;
    }
  }

  get details(): IotListDAO {
    return this._details;
  }

  deleteIot(IotId) {
    this.main.event = null;
    this._confirmationService.confirm({
      message: 'Do you want to delete?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this._manageIotService.deleteManageIot(IotId)
          .pipe(first()).subscribe({
          next: response => {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});;
            this.main.bottomPanelActive =false
            
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            this.main.bottomPanelActive =true;
          }
        });
      },
      reject: () => {
      }
    });
  }
  unassign(IotId) {
    this.main.event = null;
    this._confirmationService.confirm({
      message: 'Do you want to unassign?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this._manageIotService.unassign(IotId)
          .pipe(first()).subscribe({
          next: response => {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});;
            this.main.bottomPanelActive =false
            
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            this.main.bottomPanelActive =true;
          }
        });
      },
      reject: () => {
      }
    });
  }
  rebootIot(IotId) {

    this.main.event = null;
    this._confirmationService.confirm({
      message: 'Do you want to reboot IOT',
      header: 'Reboot Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._manageIotService.rebootManageIot(IotId)
        .pipe(first()).subscribe({
          next: response => {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});;
            this.main.bottomPanelActive =false;
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            this.main.bottomPanelActive =true;
          }
        });
      },
      reject: () => {
      }
    });
  }
}
