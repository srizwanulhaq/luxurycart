import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleHeadCountMainComponent } from './vehicle-hc-main.component';

describe('VehicleHeadCountMainComponent', () => {
    let component: VehicleHeadCountMainComponent;
    let fixture: ComponentFixture<VehicleHeadCountMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleHeadCountMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleHeadCountMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
