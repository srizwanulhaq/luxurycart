import { Component, OnInit } from '@angular/core';
import { Packages } from 'src/app/demo/domain/Dao/Tours/packages';

@Component({
  selector: 'app-packages-main',
  templateUrl: './packages-main.component.html',
  styleUrls: ['./packages-main.component.scss']
})
export class PackagesMainComponent implements OnInit {

  event: Event;
  packages:Packages;
  editPanelClick: boolean;
  editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditPackageData: Packages){

    this.packages = EditPackageData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
  onBottomPanelButtonClick(event,_package:Packages){
    this.packages = _package;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

}
