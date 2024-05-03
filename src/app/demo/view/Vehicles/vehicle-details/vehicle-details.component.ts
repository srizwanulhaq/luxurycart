import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Vehicledao } from 'src/app/demo/domain/Dao/Vehicle/Vehicledao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { VehicleMainComponent } from '../vehicle-main/vehicle-main.component';
import { first, mergeMap } from 'rxjs/operators';
import { ConfirmationService, LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehiclecommands } from 'src/app/demo/domain/Dao/Vehicle/vehicle-commands';
import { VehicleCommandService } from 'src/app/demo/service/vehicle-command.service';
import { VehicleDetailsdao } from 'src/app/demo/domain/Dao/Vehicle/VehicleDetailsDao';
import { VehicleParkingZones } from 'src/app/demo/domain/Dao/Vehicle/VehiclesParkingZones';
import { VehiclePendingCommandDao } from 'src/app/demo/domain/Dao/Vehicle/VehiclePendingCommandDao';
import { forkJoin } from 'rxjs';
import { BatteryHitDao } from 'src/app/demo/domain/Dao/BatteryHit/BatteryHitDao';
import { Table } from 'primeng/table';
import { MapService } from 'src/app/demo/service/map.service';

@Component({
    selector: 'app-vehicle-details',
    templateUrl: './vehicle-details.component.html',
    styleUrls: ['./vehicle-details.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VehicleDetailsComponent implements OnInit {

    private _details: Vehicledao;
    vehicleId: string;
    statusNumber: number;
    saveStatusMessageForm: any;
    addNewMessageShow: boolean = false;
    btnloading: boolean = false;
    loading: boolean;
    lstCommands: Vehiclecommands[];
    totalRecords: number;
    vehicleDetails: VehicleDetailsdao;
    originLocation: string = window.location.origin;
    ride_image: string;
    loadData: VehicleParkingZones[];
    zoneOptions: any = [];
    pendingCommads: VehiclePendingCommandDao[];
    totalnumber: number;
    itemsSpeedMode: any;
    val: string;
    searchValue: string = ""
    batteryHits: BatteryHitDao[]
    cols: any[];
    rowsPerPageOptions = [10, 25, 50];
    totalRows: number;
    @ViewChild(Table, { static: false }) tableEvent;
    vehicleQR:string;



    @Input() lstStatuses: SelectItem[] = []
    isShow: boolean;


    constructor(public main: VehicleMainComponent,
        private service: VehicleService,
        private messageService: MessageService,
        private confirmService: ConfirmationService,
        private _formBuilder: FormBuilder,
        private commandService: VehicleCommandService,
        private _confirmationService: ConfirmationService,
        private cdref:ChangeDetectorRef) {
   
    }

    ngOnInit(): void {

        this.itemsSpeedMode = [
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '25', value: 25 },
        ];
        this.loadLoad();
      
    }
    loadLoad() {
        this.saveStatusMessageForm = this._formBuilder.group({
            messages: ["", [Validators.required]],
        });
    }

    @Output() eventChange = new EventEmitter<Event>();
    @Input()
    set details(value: Vehicledao) {
        if (value) {
            this._details = value;
            this.getVehicleDetailsById(value.id)
            this.getPendingCommands(value.number)
            this.LoadParkingZones();
            this.loadBatteryHits()
            this.vehicleQR = `https://wayz.spiders.sa/?scan=${value.number}`;
        }
   
    }

    get details(): Vehicledao {
        return this._details;
    }

    onUpdateLocation(event, id) {
        var update_Location = event.checked;
        //------------------------------------------------------------------
        this.confirmService.confirm({
            message: "Do you want to update location?",
            header: "Change Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                //-------------------------------------
                var model = {
                    id: id,
                    update_Location: update_Location,
                };
                this.service
                    .updateLocation(model)
                    .pipe(first())
                    .subscribe({
                        next: (response) => {
                            this.eventChange.emit(response.result);
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        },
                        error: (error) => {
                            this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                        },
                    });

            },
            reject: () => {
                this.details.updateLocation = !update_Location;
            },
        });

    }
    //   loadDropdownValues() {
    //     // load vehicles Status
    //     this.service.VehicleStatus().then(responseList => {
    //       this.lstStatuses = responseList.lstStatuses;
    //     });
    //   }
    
    LoadParkingZones() {
        this.service.getParkingZones()
            .subscribe((response) => {
                this.loadData = response.data;
                this.zoneOptions = this.loadData.map((item) =>
                    ({ label: item.title, value: item.id })
                ).sort((a, b) => a.label < b.label ? -1 : 1);
            });
    }

    ChangeVehicleStatus(vehicleId: string, vehicle_Status_Number: number) {
        if (vehicle_Status_Number == 4) {
            this.vehicleId = vehicleId;
            this.statusNumber = vehicle_Status_Number;
            this.addNewMessageShow = true;
        }
        else {
            this.ChangeVehicleStatusCall(vehicleId, vehicle_Status_Number, "");
        }

    }

    ChangeVehicleStatusCall(vehicleId, statusNumber, messages) {
        this.main.event = null;
        var model = {
            vehicleId: vehicleId,
            statusNumber: statusNumber,
            messages: messages
        }
        this.service
            .changeVehicleStatus(model)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    this.eventChange.emit(response.result);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }
    onChangeZone(vehicleId, event) {
        this.main.event = null;
        var model = {
            vehicleId: vehicleId,
            zoneId: event.value,
        };

        this.service
            .updatezones(model)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    this.eventChange.emit(response.result);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }
    onSubmitStatusMessagesForm() {
        this.btnloading = true;
        if (this.saveStatusMessageForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.ChangeVehicleStatusCall(
            this.vehicleId,
            this.statusNumber,
            this.saveStatusMessageForm.value.messages
        );
        this.addNewMessageShow = false;
    }
    deleteVehicle(vehicleId: string) {
        this.main.event = null;
        this.confirmService.confirm({
            message: "Do you want to delete?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.service
                    .deleteVehicle(vehicleId)
                    .pipe(first())
                    .subscribe({
                        next: (response) => {
                            this.eventChange.emit(response.result);
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                            this.main.bottomPanelActive = false;

                        },
                        error: (error) => {
                            this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                        },
                    });

            },
            reject: () => {
            },
        });
    }

    loadCommandLazy(event: LazyLoadEvent) {

        this.loading = true;

        setTimeout(() => {
            this.commandService.getAllCommands((event.first / event.rows) + 1, event.rows, event.globalFilter, event.sortField, event.sortOrder).subscribe(resp => {
                this.lstCommands = resp.vehicleCommanddto.data;
                this.lstCommands = this.lstCommands.filter(z => z.active == true);
                this.totalRecords = this.lstCommands.length;
                if (this.lstCommands) {
                    this.loading = false;
                }
            });
        }, 1000);
    }

    sendTcpCommand(commandId) {

      // this.val = this.lstCommands.filter(x => x.id == commandId)[0].inputValue;

        this.commandService.sendCommand(this.details.number, commandId, this.val)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    this.eventChange.emit(response.status);
                    response.data.responses.lstMessage.forEach(element => {
                        if (element.isSuccess)
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: element.commandName + ' ' + element.message, life: 10000 });
                        
                        else 
                            this.messageService.add({ severity: 'error', summary: 'Failed', detail: element.commandName + ' ' + element.message, life: 10000 });
                    });  
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
                },
            });
    }
    getVehicleDetailsById(Vehicle_Id) {
        this.service.getVehicleDetails(Vehicle_Id).subscribe(responseList => {
            this.vehicleDetails = responseList.vehicleDetails;
            this.ride_image = this.originLocation + this.vehicleDetails.ride_Parking_Image;
        });
    }

    getPendingCommands(vnumber) {
        this.service.getPendingCommands(vnumber).subscribe(data => {
            this.pendingCommads = data.pendingCommands;
            this.totalnumber = data.pendingCommands.length;
        });
    }
    speedMode(event) {
        this.val = event.value
    }


    loadBatteryHits(reset: boolean = false) {
        if (reset) {
            this.tableEvent = undefined
            this.searchValue = ""
        }
        const event = this.tableEvent
        setTimeout(() => {
            this.service.getAllBatteryHits(
                this._details.number,
                this.searchValue,
                ...(!!event ? [event.first / event.rows + 1,
                event.rows,
                event.sortField,
                event.sortOrder
                ] : [])
            ).then(data => {
                this.batteryHits = data.results
                this.totalRecords = data.rowCount
            })
        }, 1000);
    }


    resetDataTable(dt) {
        dt.reset();
        this.searchValue = ""
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
    onChangeStatus(e, id) {
        var active = e.checked;
        this._confirmationService.confirm({
          message: "Do you want to change the Status?",
          header: "Change Confirmation",
          icon: "pi pi-info-circle",
          accept: () => {
            //-------------------------------------
            var model = {
              id: id,
              active: active,
            };
            this.service
              .changeStatus(model)
              .pipe(first())
              .subscribe({
                next: (response) => {
                  this.eventChange.emit(response.result);
                  this.main.bottomPanelActive = false;
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
                  
                },
                error: (error) => {
                    this.main.bottomPanelActive = true;
                    this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
                },
              });
       
          },
          reject: () => {
            this.details.active = !active;
          },
        });
    }

    onBatteryUpdate(e, id) {
        var active = e.checked;
        this._confirmationService.confirm({
          message: "Do you want to change update battery?",
          header: "Change Confirmation",
          icon: "pi pi-info-circle",
          accept: () => {
            //-------------------------------------
            var model = {
              id: id,
              update_Battery: active,
            };
            this.service
              .updatebattery(model)
              .pipe(first())
              .subscribe({
                next: (response) => {
                  this.eventChange.emit(response.result);
                  this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
                  this.main.bottomPanelActive = false;
                },
                error: (error) => {
                    this.main.bottomPanelActive = true;
                    this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
                },
              });
       
          },
          reject: () => {
            this.details.update_Battery = !active;
          },
        });
    }
    previousWeekData(){
        this.isShow = !this.isShow; 
      }
}
