import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPackageDetailComponent } from './walletp-details.component';

describe('WalletPackageDetailComponent', () => {
    let component: WalletPackageDetailComponent;
    let fixture: ComponentFixture<WalletPackageDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletPackageDetailComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletPackageDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
