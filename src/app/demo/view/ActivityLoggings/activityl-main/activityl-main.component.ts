import { Component, OnInit } from '@angular/core';
import { ActivityLoggingDao } from 'src/app/demo/domain/Dao/ActivityLoggings/ActivityLoggingDao';

@Component({
    selector: 'app-activityl-main',
    templateUrl: './activityl-main.component.html',
    styleUrls: ['./activityl-main.component.scss']
})
export class ActivityLoggingMainComponent implements OnInit {
    rightPanelActive: boolean;
    activityLogging: ActivityLoggingDao;
    event: Event;

    ngOnInit(): void { }
}
