import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPackageMainComponent } from './walletp-main.component';

describe('WalletPackageMainComponent', () => {
    let component: WalletPackageMainComponent;
    let fixture: ComponentFixture<WalletPackageMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletPackageMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletPackageMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
