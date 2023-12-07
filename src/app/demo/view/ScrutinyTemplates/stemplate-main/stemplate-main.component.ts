import { Component, OnInit } from '@angular/core';
import { RideScrutinyTemplateDto } from 'src/app/demo/domain/Dto/RideScrutinyTemplate/ScrutinyTemplateDto';

@Component({
    selector: 'app-stemplate-main',
    templateUrl: './stemplate-main.component.html',
    styleUrls: ['./stemplate-main.component.scss']
})
export class ScrutinyTemplateMainComponent implements OnInit {
    event: Event;
    rideScrutinyTemplate: RideScrutinyTemplateDto;
    showModal: boolean = false

    constructor() { }

    ngOnInit(): void {
    }

    onFormCall(template = undefined) {
        this.rideScrutinyTemplate = template;
        this.showModal = true;
        this.event = null;
    }

    onChange(event) {
        this.event = event;
    }

    onCloseForm() {
        this.showModal = false
        this.rideScrutinyTemplate = undefined
    }
}
