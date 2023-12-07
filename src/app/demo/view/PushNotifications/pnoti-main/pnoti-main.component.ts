import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-noti-main',
    templateUrl: './pnoti-main.component.html',
    styleUrls: ['./pnoti-main.component.scss']
})
export class PushNotificationMainComponent implements OnInit {
    event: Event;
    constructor() { }

    ngOnInit(): void {
    }

}
