import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeListingComponent } from './vtype-listing.component';

describe('VehicleTypeListingComponent', () => {
    let component: VehicleTypeListingComponent;
    let fixture: ComponentFixture<VehicleTypeListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleTypeListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleTypeListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
