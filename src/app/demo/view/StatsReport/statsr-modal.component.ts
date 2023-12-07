import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    template: `
		<div>
            <div *ngFor="let item of items">
                <strong>{{ item[0] }}: </strong> {{ item[1] }}
            </div>
        </div>
	`,
})
export class StatsModalComponent {
    items: any[]
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.items = Object.entries(config.data.extra)
    }

    ngOnInit() { }
}
