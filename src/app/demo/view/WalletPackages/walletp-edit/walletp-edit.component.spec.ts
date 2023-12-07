import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPackageEditComponent } from './walletp-edit.component';

describe('WalletPackageEditComponent', () => {
    let component: WalletPackageEditComponent;
    let fixture: ComponentFixture<WalletPackageEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletPackageEditComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletPackageEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
