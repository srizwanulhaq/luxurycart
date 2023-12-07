import { Component, OnInit } from '@angular/core';
import { SupportTicketDao } from 'src/app/demo/domain/Dao/SupportTickets/SupportTicketDao';
import { GetMaintenanceDto } from 'src/app/demo/domain/Dto/SupportTickets/GetMaintenanceDto';

@Component({
    selector: 'app-supportt-main',
    templateUrl: './supportt-main.component.html',
    styleUrls: ['./supportt-main.component.scss']
})
export class SupportTicketMainComponent implements OnInit {
    //maintenanceIds?: { supportTicketId: string, vehicleId: string } = null
    maintenanceIds:GetMaintenanceDto;
    bottomPanelActive: boolean;
    supportTicket: SupportTicketDao;
    event: Event;
    addMaintancePanelActive:boolean;

    ngOnInit(): void {
    }

    onDetailClick(event, supportTicket) {
        this.supportTicket = supportTicket;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }

    onChange(event) {
        this.event = event;
    }

    showVehicleMaintenanceForm(supportTicketId: string, vehicleId: string) {
        this.maintenanceIds = { supportTicketId, vehicleId }
    }
    resetMaintenanceIds() {
        this.maintenanceIds = null
    }
    addMaintance(supportTicketId: string, vehicleId: string){

        this.event == null;
        this.addMaintancePanelActive = !this.addMaintancePanelActive;
        this.maintenanceIds = { supportTicketId, vehicleId }

    }
}
