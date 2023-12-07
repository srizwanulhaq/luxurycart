import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { WalletPackageService } from '../../../service/walletPackageService';
import { first } from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { EditWalletPackageDto } from 'src/app/demo/domain/Dto/WalletPackages/WalletPackageDto';
import { WalletPackageMainComponent } from '../walletp-main/walletp-main.component';


@Component({
    selector: 'app-walletp-edit',
    templateUrl: './walletp-edit.component.html',
    styleUrls: ['./walletp-edit.component.scss']
})
export class WalletPackageEditComponent implements OnInit {

    @Input() editWPData: EditWalletPackageDto
    wpForm: FormGroup;
    modalShow: boolean = false;
    regsubmitted = false;
    btnloading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
        private wPService: WalletPackageService,
        private messageService: MessageService,
        public main:WalletPackageMainComponent) { }

    @Output() eventChange = new EventEmitter<Event>();
    @Output() resetEditWPData = new EventEmitter<null>();

    ngOnInit(): void {
        this.wpForm = this._formBuilder.group({
            title: ["", [Validators.required]],
            top_Up_Amount: ["0", [Validators.required, Validators.min(0)]],
            bonus_Amount: ["0", [Validators.required, Validators.min(0)]],

        });
    }

    ngOnChanges(change: SimpleChange) {
        if (!!change['editWPData'].currentValue) {
            const temp = change['editWPData'].currentValue
            this.showWPStoreForm()
            this.wpForm.controls.title.setValue(temp.title);
            this.wpForm.controls.top_Up_Amount.setValue(temp.top_Up_Amount);
            this.wpForm.controls.bonus_Amount.setValue(temp.bonus_Amount);
        }
    }

    showWPStoreForm() {
        this.resetForm();
        this.modalShow = true;
        this.btnloading = false;
    }

    onUpdateWP() {
        this.regsubmitted = true;
        this.btnloading = true;
        if (this.wpForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.wPService.updateWalletPackage({
            id: this.editWPData.id,
            title: this.wpForm.value.title,
            topUpAmount: this.wpForm.value.top_Up_Amount,
            bonusAmount: this.wpForm.value.bonus_Amount,
        })
            .pipe(first())
            .subscribe({
                next: (response) => {
                    if (response.result) {
                        this.eventChange.emit(response.result);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                        this.modalShow = false;
                        this.btnloading = false;
                        this.main.editwpPanelActive = false;
                        this.main.bottomPanelActive = false;

                    } else {
                        this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                    }
                },
                error: (error) => {
                    this.modalShow = false;
                    this.resetForm();
                    this.btnloading = false;
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error, life: 3000 });
                },
            });
    }

    resetForm() {
        this.regsubmitted = false;
        this.wpForm.reset();
    }

    closeModal() {
        this.modalShow = false
        this.resetEditWPData.emit(null);
    }

}
