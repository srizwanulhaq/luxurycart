import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppSidebarService } from './demo/service/app.siderbar.service';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="layout-menu">
			<li app-menuitem *ngFor="let item of sidebarService.items$ | async; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `,
    providers: [AppSidebarService]
})
export class AppMenuComponent implements OnInit {

    constructor(public app: AppMainComponent, public sidebarService: AppSidebarService) { }

    ngOnInit() {
    }
}
