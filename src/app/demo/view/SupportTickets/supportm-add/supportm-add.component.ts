import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, } from "@angular/forms";
import { SupportTicketService } from '../../../service/supportTicketService';
import { first } from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { NewVehiclemaintenanceDto } from 'src/app/demo/domain/Dto/SupportTickets/VehiclemaintenanceDto';
import { SMInventoryFieldDao, SMInventoryItemDao } from 'src/app/demo/domain/Dao/SupportTickets/SupportMaintenanceInventoryDao';
import { SupportTicketMainComponent } from '../supportt-main/supportt-main.component';



@Component({
    selector: 'app-supportm-add',
    templateUrl: './supportm-add.component.html',
    styleUrls: ['./supportm-add.component.scss']
})

export class VehicleMaintenanceAddComponent implements OnInit {
    @Input() maintenanceIds?: { supportTicketId: string, vehicleId: string }
    
    vehiclemaintenance: NewVehiclemaintenanceDto;
    vmForm: FormGroup;
    regsubmitted = false;
    btnloading: boolean = false;
    itemInventories: Array<SMInventoryItemDao> = [];
    selectedInventories: Array<SMInventoryItemDao> = [];

    constructor(private _formBuilder: FormBuilder,
        private sTService: SupportTicketService,
        private messageService: MessageService,
        public main: SupportTicketMainComponent ) {
        this.getAllInventoryload()
    }

    @Output() eventChange = new EventEmitter<Event>();
    @Output() resetMaintenanceIds = new EventEmitter<null>();

    ngOnInit(): void {
        console.log(this.maintenanceIds);
        this.vmForm = this._formBuilder.group({
            supportTicketId: ["", [Validators.required]],
            vehicleNumber: ["", [Validators.required]],
            fixedDate: ["", [Validators.required]],
            fixedTime: ["", [Validators.required]],
            description: ["", [Validators.required]],
            arrQuantity: this._formBuilder.array([]),
            inventories: [""]
        });
    }

    ngOnChanges(change: SimpleChange) {
        if (!!this.maintenanceIds) {
            this.resetForm();
            this.vmForm.controls.supportTicketId.setValue(this.maintenanceIds.supportTicketId);
            this.vmForm.controls.vehicleNumber.setValue(this.maintenanceIds.vehicleId);
            this.btnloading = false;
        }
    }

    onStoreVM() {
        this.regsubmitted = true;
        this.btnloading = true;
        if (this.vmForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.sTService.storeVehicleMaintenance({
            SupportTicketId: this.vmForm.value.supportTicketId,
            vehicleNumber: this.vmForm.value.vehicleNumber,
            fixedDate: this.vmForm.value.fixedDate,
            fixedTime: this.vmForm.value.fixedTime,
            description: this.vmForm.value.description,
            maintenanceInventories: this.vmForm.value.arrQuantity.map(item => ({ inventoryId: item.inventoryId, quantity: item.quantity }))
        })
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.result) {
                        this.eventChange.emit(response.result);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.closeModal()

                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.resetForm();
                    this.closeModal()
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error, life: 3000 });
                },
            });
    }

    getAllInventoryload() {
        this.sTService.getInventories()
            .then(supportT => {
                this.itemInventories = supportT.data.map(item => ({
                    name: item.name,
                    id: item.id
                }));
            })
    }

    createInventoryQuantity(): FormGroup {
        return this._formBuilder.group({
            quantity: new FormControl("", [Validators.required, Validators.min(0)]),
            inventoryId: new FormControl("", [Validators.required]),
            inventoryName: new FormControl("", [Validators.required]),
        });
    }

    get InventoryQuantityControls() {
        return this.vmForm.get("arrQuantity")["controls"];
    }

    get InventoryQuantityFormArraySet(): FormArray {
        return this.vmForm.get("arrQuantity") as FormArray;
    }

    removeInventoryQuantityForm(i: number) {
        const inventoryQuantity = this.vmForm.controls.arrQuantity as FormArray;
        inventoryQuantity.removeAt(i);
    }

    onInventoryChange(event) {

        var selectedValueLength = event.value.length;
        var InventoryQuantityControlsLength = this.InventoryQuantityControls.length;

        if (selectedValueLength > InventoryQuantityControlsLength) {
            var inventoryRoot: Array<SMInventoryFieldDao> = [];
            event.value.forEach(function (item) {
                inventoryRoot.push({
                    inventoryId: item.id,
                    inventoryName: item.name,
                    quantity: null,
                });
            });

            this.addInventoryQuantityForm();
            this.setArrQuantityValues(inventoryRoot);

        } else if (selectedValueLength < InventoryQuantityControlsLength) {
            const inventoryQuantity = this.vmForm.controls.arrQuantity as FormArray;
            const index = inventoryQuantity.value.findIndex(fruit => fruit.inventoryId === event.itemValue.code);
            this.removeInventoryQuantityForm(index);
        }
    }

    get filtersFormArray() {
        return <FormArray>this.vmForm.get("arrQuantity");
    }

    addInventoryQuantityForm() {
        this.filtersFormArray.push(this.createInventoryQuantity());
    }

    setArrQuantityValues(inventoryRoot: Array<SMInventoryFieldDao>) {
        this.InventoryQuantityFormArraySet.setValue(inventoryRoot);
    }

    resetForm() {
        this.regsubmitted = false;
        this.vmForm.reset();
    }

    closeModal() {
        this.btnloading = false;
        this.resetMaintenanceIds.emit();
    }

}
