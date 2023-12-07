import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { WalletPackageService } from '../../../service/walletPackageService';
import { first } from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { NewWalletPackageDto } from 'src/app/demo/domain/Dto/WalletPackages/WalletPackageDto';
import { WalletPackageMainComponent } from '../walletp-main/walletp-main.component';


@Component({
    selector: 'app-walletp-add',
    templateUrl: './walletp-add.component.html',
    styleUrls: ['./walletp-add.component.scss']
})
export class WalletPackageAddComponent implements OnInit {

    walletPackage: NewWalletPackageDto;
    wpForm: FormGroup;
    modalShow: boolean = false;
    regsubmitted = false;
    btnloading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
        private wPService: WalletPackageService,
        private messageService: MessageService,
        public main:WalletPackageMainComponent) { }

    @Output() eventChange = new EventEmitter<Event>();

    ngOnInit(): void {
        this.wpForm = this._formBuilder.group({
            title: ["", [Validators.required]],
            top_Up_Amount: ["0", [Validators.required, Validators.min(0)]],
            bonus_Amount: ["0", [Validators.required, Validators.min(0)]],

        });
    }

    showWPStoreForm() {
        this.resetForm();
        this.modalShow = true;
        this.btnloading = false;
        this.main.event = null;
    }

    onStoreWP() {
        this.regsubmitted = true;
        this.btnloading = true;
        if (this.wpForm.invalid) {
            this.btnloading = false;
            return;
        }

        this.wPService.storeWalletPackage({
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

}
