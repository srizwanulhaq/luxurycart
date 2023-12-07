import { Component, OnInit } from '@angular/core';
import { VehicleCompanydao } from 'src/app/demo/domain/Dao/Vehicle/VehicleCompanydao';

@Component({
    selector: 'app-vcompany-main',
    templateUrl: './vcompany-main.component.html',
    styleUrls: ['./vcompany-main.component.scss']
})
export class VehicleCompanyMainComponent implements OnInit {
    event: Event;
    vehicleCompany: VehicleCompanydao;
    showModal: boolean = false

    constructor() { }

    ngOnInit(): void {
    }

    onFormCall(template = undefined) {
        this.vehicleCompany = template;
        this.showModal = true;
        this.event = null;
    }

    onChange(event) {
        this.event = event;
    }

    onCloseForm() {
        this.showModal = false
        this.vehicleCompany = undefined
    }
}
