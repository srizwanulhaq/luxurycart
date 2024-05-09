import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DriveModeDropDown, VehicleTypedao } from 'src/app/demo/domain/Dao/Vehicle/VehicleTypedao';
import { VehicleService } from 'src/app/demo/service/vehicleservice';

@Component({
    selector: 'app-vtype-form',
    templateUrl: './vtype-form.component.html',
    styleUrls: ['./vtype-form.component.scss']
})
export class VehicleTypeFormComponent implements OnInit {
    driveModeDropDown:DriveModeDropDown[];
    formMode: string
    @Input("vehicleType") vehicleType: VehicleTypedao
    @Input("showModal") showModal: boolean
    submitted: boolean = false;
    itemsSpeedMode:any;
    dataForm;
    btnloading: boolean = false;
    @Output() eventChange = new EventEmitter<any>();
    @Output() closeForm = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder,
        private service: VehicleService,
        private messageService: MessageService,
        private cdref: ChangeDetectorRef) {
        this.loadForm();
    }
    
    ngOnInit(): void {
        this.itemsSpeedMode = [
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '25', value: 25 },
        ];
        
        this.loadDropDown();
     }

    ngOnChanges(change: SimpleChange) {
        if (!!change['showModal'].currentValue && !!change['vehicleType']?.currentValue) {
            this.dataForm.setValue({
                title: this.vehicleType.title,
                seatingCapacity: this.vehicleType.seatingCapacity,
                maxSpeed: this.vehicleType.maxSpeed,
                drive_Mode_Id:this.vehicleType.drive_Mode.id,
                //ticketPrice:this.vehicleType.ticketPrice || 0.0,
                duration: this.vehicleType.duration || 0.0,
            })
        }
    }
    loadDropDown()
    {
        this.service.loadDropDown().subscribe(resp => {
                if (resp.status) {
                    this.driveModeDropDown = resp.data
                }
            })
    }
    loadForm() {
        this.dataForm = this.formBuilder.group({
            title: ["", [Validators.required]],
            seatingCapacity: [0, [Validators.required,Validators.max(100)]],
            maxSpeed: [0, [Validators.required,Validators.max(200),Validators.min(10)]],
            drive_Mode_Id:["", [Validators.required]],
            //ticketPrice:[0.0, [Validators.required]],
            duration: [0.0, [Validators.required]],
        });
    }

    resetAll() {
        this.submitted = false;
        this.closeForm.emit()
        this.dataForm.reset()
    }

    onSubmitData() {
        this.btnloading = true;
        if (this.dataForm.invalid) {
            this.btnloading = false;
            return;
        }
        this.service.submitVehicleType(this.dataForm.value, this.vehicleType?.id || "")
            .then(resp => {
                if (resp.status) {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: resp.message, life: 3000 });
                    this.resetAll()
                    this.eventChange.emit(true)
                } else {
                    this.messageService.add({ severity: 'warning', summary: 'Failed', detail: resp.message, life: 3000 });
                }
            }).catch((e: any) => {
                if (!!e.error && typeof e.error == "string") {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: e.error, life: 3000 });
                } else {
                    console.log(e);
                }
            }).finally(() => {
                this.btnloading = false;
            })
    }
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }
}
