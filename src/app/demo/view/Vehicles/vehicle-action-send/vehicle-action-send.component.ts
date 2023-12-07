import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { VehicleCommandDao } from 'src/app/demo/domain/Dao/Vehicle/vehicle-commands';
import { VehicleStatusdao, VStatus } from 'src/app/demo/domain/Dao/Vehicle/VehicleStatusdao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-vehicle-action-send',
    templateUrl: './vehicle-action-send.component.html',
    styleUrls: ['./vehicle-action-send.component.scss']
})
export class VehicleActionSendComponent {

    private _vehicleStatuses: VehicleStatusdao[]
    actionVal: string
    selectedNo: number
    @Input("actionType") actionType: "command" | "status"
    @Input("vehicleCommands") vehicleCommands: VehicleCommandDao[]
    @Input("vehicles") vehicles: string[]
    @Input() set vehicleStatuses(value: VStatus[]) {
        if (value) {
            this._vehicleStatuses = value
                .map(status => ({ title: status.label, number: status.value }))
                .sort((a, b) => (a.number - b.number))
        }
    } get vehicleStatuses(): any[] {
        return this._vehicleStatuses
    }

    @Output("sendAction") onActionSend = new EventEmitter<void>();
    @Output("onResetSendAction") resetSendAction = new EventEmitter<void>();

    constructor(private vehicleService: VehicleService,
        private messageService: MessageService) {
    }

    ngOnChanges(changes: SimpleChange) {
        if (changes.hasOwnProperty("actionType") &&
            changes["actionType"].previousValue != changes["actionType"].currentValue
        ) {
            if (this.actionType == 'command') {
                this.actionVal = "1"
                this.selectedNo = undefined
            } else {
                this.actionVal = ""
                if (this.vehicleStatuses) {
                    this.selectedNo = this.vehicleStatuses[0].number
                }
            }
        }
    }

    setAndSendCommandNo(no: number) {
        this.selectedNo = no
        this.onSendAction()
    }

    onSendAction() {
        if (this.vehicles.length < 1 || (((this.actionType == "status" && this.selectedNo == 4)
            || this.vehicleCommands.find(c => c.number == this.selectedNo).title == "Send_THROTTLE_ON")
            && !this.actionVal)) {
            return
        }
        const sendData: object = {
            [this.actionType + "Number"]: +this.selectedNo,
            vehicleNumberList: this.vehicles
        }
        if (this.actionType == "status" || this.vehicleCommands.find(c => c.number == this.selectedNo).title == "Send_THROTTLE_ON") {
            if (this.actionType == "status") {
                sendData["message"] = this.actionVal
            } else {
                sendData["inputValue"] = this.actionVal
            }
        }
        this.vehicleService.sendAction(sendData, this.actionType).pipe(first())
            .subscribe({
                next: (response) => {
                    if (this.actionType == "status" && Array.isArray(response)) {
                        response.forEach(resp => {
                            this.messageService.add({
                                severity:
                                    resp.status ? 'success' : 'error',
                                summary: resp.status ? ' Successful' : ' Failed',
                                detail: resp.message + " vehicle:" + resp.vehicleNumber, life: 3000
                            });
                        })
                        this.onActionSend.emit()
                    } else if (this.actionType != "status" && response.result) {
                        response.data.forEach(resp => {
                            this.messageService.add({
                                severity:
                                    resp.lstMessage[0] == "Success" ? 'success' : 'error',
                                summary: resp.number + " " + resp.lstMessage[0].message,
                                detail: `Command ${resp.lstMessage[0].commandName} was ${resp.lstMessage[0] == "Success" ? 'successfull' : 'failed'} vehicle: ${resp.number}`, life: 3000
                            });
                        })
                        this.onActionSend.emit()
                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }

    onCloseActionPanel() {
        this.resetSendAction.emit()
    }
}
