import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IotListDAO } from 'src/app/demo/domain/Dao/IOT/IOTdao';

@Component({
  selector: 'app-manage-iot-main',
  templateUrl: './manage-iot-main.component.html',
  styleUrls: ['./manage-iot-main.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ManageIotMainComponent implements OnInit {

  global_Status: any;
  Iot:IotListDAO;
  EditIotData:IotListDAO =null;
  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  editPanelClick: boolean;
  editPanelActive: boolean;
  addPanelClick: boolean;
  addPanelActive: boolean;
  event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  onBottomPanelButtonClick(event, iot) {
    this.Iot = iot;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
  onBottomPanelClick() {
    this.bottomPanelClick = true;
  }
  onChange(event){
    this.event = event;
  }
  editIot(EditIotData: IotListDAO) {
    this.EditIotData = EditIotData
}
resetEditIot() {
  this.EditIotData = null
}

showManageIotForm()
{
  this.addPanelClick = true;
  this.addPanelActive = !this.addPanelActive;
  this.event = null;
}

onEditPanelButtonClick(event, EditIotData: IotListDAO){

  this.EditIotData = EditIotData
  this.editPanelClick = true;
  this.editPanelActive = !this.editPanelActive;
  event.preventDefault();
  this.event = null;
}
}
