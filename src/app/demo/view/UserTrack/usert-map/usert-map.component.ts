import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/demo/service/loaderservice';
import { Subject } from 'rxjs';
import { UserTrackDao } from 'src/app/demo/domain/Dao/User/UserTrackingDao';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    selector: 'app-usert-map',
    templateUrl: './usert-map.component.html',
    styleUrls: ['./usert-map.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class UserTrackMapComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    userTracks: UserTrackDao[] = []
    loading: boolean = false;
    searchValue: string = "";
    latitude: number = 24.7136
    longitude: number = 46.6753
    @Input() mapActive: boolean = false
    @Output() onMapBtnClick = new EventEmitter<boolean>();
    @Output() onDetailClick = new EventEmitter<string>()

    constructor(private service: UserService, private loaderService: LoaderService) {
    }

    ngOnInit(): void { }

    ngOnChanges(change: SimpleChange) {
        if (!!change["mapActive"] && !!change['mapActive'].currentValue) {
            this.loadUserTrackingMap()
        }
    }

    loadUserTrackingMap(reset = false) {
        this.loading = true;
        if (reset) {
            this.searchValue = ""
        }
        setTimeout(() => {
            this.service.getAllUserTrackingResp(this.searchValue).then(resp => {
                this.userTracks = resp.result
                if (this.userTracks.length > 0) {
                    this.latitude = this.userTracks[0].latitude
                    this.longitude = this.userTracks[0].longitude
                }
                this.loading = false;
            })
        }, 1000);
    }

    onMapPanelClose() {
        this.userTracks = []
        this.searchValue = ""
        this.onMapBtnClick.emit(false)
    }

    getDetails(userId: string) {
        this.onDetailClick.emit(userId);
    }
}


