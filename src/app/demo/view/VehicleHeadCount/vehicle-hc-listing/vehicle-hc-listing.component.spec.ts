import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleHeadCountListingComponent } from './noti-listing.component';

describe('VehicleHeadCountListingComponent', () => {
    let component: VehicleHeadCountListingComponent;
    let fixture: ComponentFixture<VehicleHeadCountListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleHeadCountListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleHeadCountListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
