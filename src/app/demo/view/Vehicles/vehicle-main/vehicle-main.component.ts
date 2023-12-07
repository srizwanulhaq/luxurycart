import { Component, OnInit } from '@angular/core';
import { VehicleCommandDao } from 'src/app/demo/domain/Dao/Vehicle/vehicle-commands';
import { Vehicles } from 'src/app/demo/domain/Dao/Vehicle/Vehicles';
import { VStatus } from 'src/app/demo/domain/Dao/Vehicle/VehicleStatusdao';
import { EditVehicleDto } from 'src/app/demo/domain/Dto/Vehicles/EditVehicleDto';
import { VehicleCommandService } from 'src/app/demo/service/vehicle-command.service';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vehicle-main',
    templateUrl: './vehicle-main.component.html',
    styleUrls: ['./vehicle-main.component.scss']
})
export class VehicleMainComponent implements OnInit {
    actionType?: "command" | "status" = null
    vehicleCommands: VehicleCommandDao[]
    vehicleStatuses: VStatus[]
    selectedVehicles: string[] = []
    vehicle: Vehicles;
    editVehicleData: EditVehicleDto;
    bottomPanelClick: boolean;
    editPanelClick: boolean;
    bottomPanelActive: boolean;
    editPanelActive: boolean;
    locationPanelActive: boolean;
    event: Event;
    constructor(private cmdservice: VehicleCommandService,
        private vehicleService: VehicleService
    ) {
        this.getAllList()
    }

    ngOnInit(): void {
    }

    getAllList() {
        this.cmdservice.getCommandsList().then(data => {
            this.vehicleCommands = data
        })

        this.vehicleService.VehicleStatus().then(responseList => {
            this.vehicleStatuses = responseList.lstStatuses
                .filter(x => x.value != 9 && x.value != 8 && x.value != 10 && x.value != 11 && x.value != 12 && x.value != 14 && x.value != 13 && x.value != 7)
                .sort((a, b) => a.label < b.label ? -1 : 1)
        });
    }

    onBottomPanelButtonClick(event, vehicle) {
        this.vehicle = vehicle;
        this.bottomPanelClick = true;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
    }

    onEditPanelButtonClick(event, editVehicleData: EditVehicleDto) {
        this.editVehicleData = editVehicleData;
        this.editPanelActive = !this.editPanelActive;
        event.preventDefault();
        this.event = null;
    }
    resetEditVeh() {
        this.editVehicleData = null
    }
    onBottomPanelClick() {
        this.bottomPanelClick = true;
    }

    onChange(event) {
        this.event = event;
    }
    ChangeLocation(vehicle) {

        this.vehicle = vehicle;
        this.locationPanelActive = !this.locationPanelActive;

    }

    onToggleActionRighPanel(type?: 'command' | 'status') {
        this.actionType = type;
    }

    onVehicleSelect(vehicleNos: string[]) {
        this.selectedVehicles = vehicleNos
        if (this.selectedVehicles.length < 1 && !!this.actionType) {
            this.onToggleActionRighPanel()
        }
    }

    onActionSend() {
        this.resetSendAction(false)
        this.onChange(true)

    }

    resetSendAction(justClose = true) {
        this.onToggleActionRighPanel()
        if (!justClose) {
            this.selectedVehicles = []
        }
    }
}
