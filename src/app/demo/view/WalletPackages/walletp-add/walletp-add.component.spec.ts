import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPackageAddComponent } from './walletp-add.component';

describe('WalletPackageAddComponent', () => {
    let component: WalletPackageAddComponent;
    let fixture: ComponentFixture<WalletPackageAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletPackageAddComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletPackageAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
