import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletPackageListingComponent } from './walletp-listing.component';

describe('WalletPackageListingComponent', () => {
    let component: WalletPackageListingComponent;
    let fixture: ComponentFixture<WalletPackageListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletPackageListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletPackageListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
