import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeMainComponent } from './vtype-main.component';

describe('VehicleTypeMainComponent', () => {
    let component: VehicleTypeMainComponent;
    let fixture: ComponentFixture<VehicleTypeMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleTypeMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleTypeMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
