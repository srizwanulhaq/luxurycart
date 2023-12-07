import { Component, Input } from '@angular/core';
import { SupportTicketDao, UserDetailsdao } from 'src/app/demo/domain/Dao/SupportTickets/SupportTicketDao';
import { SupportTicketService } from 'src/app/demo/service/supportTicketService';
import { SupportTicketMainComponent } from '../supportt-main/supportt-main.component';

@Component({
    selector: 'app-supportt-details',
    templateUrl: './supportt-details.component.html',
    styleUrls: ['./supportt-details.component.scss']
})
export class SupportTicketDetailComponent {

    private _details: SupportTicketDao;
    userDetails: UserDetailsdao;

    constructor(public main: SupportTicketMainComponent,
        private service: SupportTicketService,) { }

    ngOnInit(): void {
    }

    @Input()
    set details(value: SupportTicketDao) {
        if (value) {
            this._details = value;
            this.getUserDetailsById(value.user_Id);
        }

    }

    get details(): SupportTicketDao {
        return this._details;
    }

    getUserDetailsById(user_Id) {
        this.service.getUserDetails(user_Id).subscribe(responseList => {
            this.userDetails = responseList.userDetails;
        });
    }
}
