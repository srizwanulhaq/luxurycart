import { Component, OnInit } from '@angular/core';
import { WalletPackageDao } from 'src/app/demo/domain/Dao/WalletPackages/WalletPackageDao';
import { GetWalletPackageIdDao } from 'src/app/demo/domain/Dao/WalletPackages/ZonePackageDao';

@Component({
    selector: 'app-walletp-main',
    templateUrl: './walletp-main.component.html',
    styleUrls: ['./walletp-main.component.scss']
})
export class WalletPackageMainComponent implements OnInit {
    editWPData: WalletPackageDao = null
    bottomPanelActive: boolean;
    walletPackage: WalletPackageDao;
    event: Event;
    editwpPanelActive: boolean;
    packageId:GetWalletPackageIdDao;

    ngOnInit(): void {
    }

    onDetailClick(event, walletPackage,Package_Id) {
        this.walletPackage = walletPackage;
        this.bottomPanelActive = !this.bottomPanelActive;
        event.preventDefault();
        this.packageId = Package_Id;
    }

    onChange(event) {
        this.event = event;
    }

    editWp(walletPackage: WalletPackageDao) {
        this.event = null;
        this.editWPData = walletPackage;
        this.editwpPanelActive = !this.editwpPanelActive;
    }

    resetEditWP() {
        this.editWPData = null
        this.event = null
    }
}
