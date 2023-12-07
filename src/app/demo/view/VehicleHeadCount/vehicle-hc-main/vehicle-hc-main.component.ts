import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-vehilce-hc-main',
    templateUrl: './vehicle-hc-main.component.html',
    styleUrls: ['./vehicle-hc-main.component.scss']
})
export class VehicleHeadCountMainComponent implements OnInit {
    event: Event;
    vehicle_no: string = ""
    constructor() { }

    ngOnInit(): void {
    }
    onChange(event) {
        this.event = event;
    }
    onVehicleSelect(vehicle_no) {
        this.vehicle_no = vehicle_no
    }
}
