import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-noti-main',
    templateUrl: './noti-main.component.html',
    styleUrls: ['./noti-main.component.scss']
})
export class NotificationMainComponent implements OnInit {
    event: Event;
    constructor() { }

    ngOnInit(): void {
    }

}
