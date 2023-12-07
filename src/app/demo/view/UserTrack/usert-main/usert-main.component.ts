import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-usert-main',
    templateUrl: './usert-main.component.html',
    styleUrls: ['./usert-main.component.scss']
})
export class UserTrackMainComponent implements OnInit {
    event: Event;
    userId: string = null
    bottomPanelActive: boolean = false
    mapActive: boolean = false

    ngOnInit(): void {
    }

    onBottomPanelButtonClick(userId: string) {
        this.userId = userId
        this.bottomPanelActive = !!userId
    }

    onMapBtnClick(mapActive: boolean) {
        this.mapActive = mapActive
    }
}
