import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPackageMainComponent } from './walletp-main.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Wallet Packages'
        },
        children: [
            {
                path: '',
                redirectTo: 'wallet-packages'
            },
            {
                path: 'wallet-package-main',
                component: WalletPackageMainComponent,
                data: {
                    title: 'Wallet Packages'
                }
            },
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletPackageMainRoutingModule { }
