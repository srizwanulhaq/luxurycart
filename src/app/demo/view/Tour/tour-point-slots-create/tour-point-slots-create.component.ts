import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-point-slots-create',
  templateUrl: './tour-point-slots-create.component.html',
  styleUrls: ['./tour-point-slots-create.component.scss']
})
export class TourPointSlotsCreateComponent implements OnInit {

  pointSlotDialog:boolean;
  pointSlotForm:any
  constructor() { }

  ngOnInit(): void {
  }

  openNew(){

  }
  onSubmitForm(){

  }
}
