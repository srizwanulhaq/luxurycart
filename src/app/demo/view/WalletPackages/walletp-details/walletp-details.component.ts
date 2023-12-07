import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WalletPackageDao } from 'src/app/demo/domain/Dao/WalletPackages/WalletPackageDao';
import { WalletPackageService } from 'src/app/demo/service/walletPackageService';
import { WalletPackageMainComponent } from '../walletp-main/walletp-main.component';
import { first } from 'rxjs/operators';
import { GetWalletPackageIdDao, ZonePackageDao } from 'src/app/demo/domain/Dao/WalletPackages/ZonePackageDao';

@Component({
    selector: 'app-walletp-details',
    templateUrl: './walletp-details.component.html',
    styleUrls: ['./walletp-details.component.scss'],
    providers:[ConfirmationService,MessageService]
})
export class WalletPackageDetailComponent {

    private _details: WalletPackageDao;
    private _packageId:GetWalletPackageIdDao;
    ValidZones: ZonePackageDao[];
    totalRecords: number;

    constructor(public main: WalletPackageMainComponent,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private wPService: WalletPackageService
        ) {
         }

    ngOnInit(): void {
     
    }

    @Input()
    set details(value: WalletPackageDao) {
        if (value) {
            this._details = value;
             this.getValidZonesPackageId(value.id);
        }
    }

    get details(): WalletPackageDao {
        return this._details;
    }

    @Input()
    set packageId(Id:GetWalletPackageIdDao) {
        if (Id) {
            this._packageId = Id;
            // this.getValidZonesPackageId(Id);
        }
    }

    get packageId(): GetWalletPackageIdDao {
        return this._packageId;
    }

    onToggleWalletPackage(e, id: string) {
        this.main.event = null;
        this.confirmationService.confirm({
            message: `Do you want to ${this.details.active ? 'deactivate' : 'activate'} this package?`,
            header: "Change Activation",
            icon: "pi pi-info-circle",
            accept: () => {
                this.wPService.toggleWalletPackage({
                    id: id,
                    isActive: e.checked
                })
                    .pipe(first())
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({ severity: response.status, summary: "Successful", detail: response.message, life: 3000 });
                            this.details.active = e.checked
                        },
                        error: (error) => {
                            this.messageService.add({ severity: "error", summary: "Failed", detail: error, life: 3000 });
                        },
                    });
            },
            reject: () => {
                this.details.active = !e.checked
                this.messageService.add({ severity: "warning", summary: "Failed", detail: "You have rejected", life: 3000 });
            }
        });
    }
    getValidZonesPackageId(Package_Id) {
        this.wPService.getValidZones(Package_Id).subscribe(responseList => {
           this.ValidZones = responseList.validZones.data;
           this.totalRecords = responseList.validZones.totalCount;
        });
      }
   
}
