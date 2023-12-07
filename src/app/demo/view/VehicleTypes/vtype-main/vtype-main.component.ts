import { Component, OnInit } from '@angular/core';
import { VehicleTypedao } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';

@Component({
    selector: 'app-vtype-main',
    templateUrl: './vtype-main.component.html',
    styleUrls: ['./vtype-main.component.scss']
})
export class VehicleTypeMainComponent implements OnInit {
    event: Event;
    vehicleType: VehicleTypedao;
    showModal: boolean = false

    constructor() { }

    ngOnInit(): void {
    }

    onFormCall(data = undefined) {
        this.vehicleType = data;
        this.showModal = true;
        this.event = null;
    }

    onChange(event) {
        this.event = event;
    }

    onCloseForm() {
        this.showModal = false
        this.vehicleType = undefined
    }
}
