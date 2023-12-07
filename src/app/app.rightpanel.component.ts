import { Component, Input } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { NotificationDao } from './demo/domain/Dao/Notification/NotificationDao';
import { NotificationService } from './demo/service/notification.service';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html',
    providers: [
        NotificationService
    ]
})
export class AppRightPanelComponent {

    loading: Boolean = true
    notifications: NotificationDao[] = []

    constructor(private service: NotificationService, public app: AppMainComponent) {
        this.getUnreadNotifications()
    }

    @Input()
    set event(event: NotificationDao[]) {
        if (event) {
            this.notifications = event;
        }
    }

    getUnreadNotifications() {
       
        this.service.getUnreadNotification().then(resp => {
            this.notifications = resp
            this.loading = false
        })
    }
}
