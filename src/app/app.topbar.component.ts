import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AuthenticationService } from './demo/service/authenticationservice';
import { NotificationService } from './demo/service/notification.service';
import * as signalR from '@microsoft/signalr';
import { ActivityloggingCountDao } from './demo/domain/Dao/ActivityLogging/ActivityLogginCountDao';
import { Howl } from 'howler';
import { NotificationDao } from './demo/domain/Dao/Notification/NotificationDao';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [
        NotificationService
    ]
})
export class AppTopBarComponent {

    activity: ActivityloggingCountDao;
    errorMessage = '';
    currentUserName:string;

    @Output() eventChange = new EventEmitter<NotificationDao[]>();

    constructor(public app: AppComponent, public appMain: AppMainComponent,
        private authService: AuthenticationService, private notiService: NotificationService) {

            this.currentUserName = localStorage.getItem("userName");
         }

    ngOnInit(): void {
        
        this.getActivityCount();
        
        const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl(environment.apiUrl + '/notify')
        .build();

        connection.start().then(function () {
            console.log('SignalR Connected!');
        }).catch(function (err) {
            return console.error(err.toString());
        });

        connection.on("BroadcastMessage", () => {
            this.getActivityCount();
        });
    }

    getActivityCount() {
        this.notiService.getNotificationCount().then(res => {
            this.activity = res.data;
            if (this.activity.count > 0) {
                this.getActivityMessage();
                
                var sound = new Howl({
                    src: ['assets/notification.mp3']
                    });
    
                sound.play();
            }
        },
        error => this.errorMessage = <any>error
        );
    }

    getActivityMessage() {
         this.notiService.getUnreadNotification().then(resp => {
            this.eventChange.emit(resp);
        })
    }

    logout() {
        this.authService.logout();
    }

    rightPanelClick(event) {
        this.appMain.onRightPanelButtonClick()
        setTimeout(() => this.notiService.readNotifications(), 500)
        event.preventDefault();
    }
}
