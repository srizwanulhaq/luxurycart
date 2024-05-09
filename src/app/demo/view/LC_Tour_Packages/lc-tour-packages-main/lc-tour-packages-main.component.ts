import { Component, OnInit } from '@angular/core';
import { LCTourPackage } from 'src/app/demo/domain/Dao/LCTourPackage/lc-tour-package.model';

@Component({
  selector: 'app-lc-tour-packages-main',
  templateUrl: './lc-tour-packages-main.component.html',
  styleUrls: ['./lc-tour-packages-main.component.scss']
})
export class LCTourPackagesMainComponent implements OnInit {

  bottomPanelClick: boolean;
  bottomPanelActive: boolean;
  addPanelClick: boolean;
  addPanelActive: boolean;
  editPanelClick: boolean;
  editPanelActive: boolean;
  _packages:LCTourPackage;
  event: Event;
  constructor() { }

  ngOnInit(): void {
  }
  onBottomPanelButtonClick(event, packages) {
    this._packages = packages;
    this.bottomPanelClick = true;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }

  onChange(event){
    this.event = event;
  }

  onEditPanelButtonClick(event, packages: LCTourPackage){

    this._packages = packages;
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
}
