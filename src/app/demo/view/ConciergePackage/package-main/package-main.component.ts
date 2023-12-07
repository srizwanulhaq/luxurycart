import { Component, OnInit } from '@angular/core';
import { ConciergePackages } from 'src/app/demo/domain/Dao/Concierge/concierge-packages';

@Component({
  selector: 'app-package-main',
  templateUrl: './package-main.component.html',
  styleUrls: ['./package-main.component.scss']
})
export class PackageMainComponent implements OnInit {

  event: Event;
  package:ConciergePackages;
  editPanelClick: boolean;
  editPanelActive: boolean;
  bottomPanelActive:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(e){
    this.event = e;
  }

  onEditPanelButtonClick(event, EditPackageData: ConciergePackages){

    this.package = EditPackageData
    this.editPanelClick = true;
    this.editPanelActive = !this.editPanelActive;
    event.preventDefault();
    this.event = null;
   }
  onBottomPanelButtonClick(event,packages:ConciergePackages){
    this.package = packages;
    this.bottomPanelActive = !this.bottomPanelActive;
    event.preventDefault();
  }
}
