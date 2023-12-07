import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleHeadCountCreateComponent } from './vehicle-hc-create.component';

describe('VehicleHeadCountCreateComponent', () => {
    let component: VehicleHeadCountCreateComponent;
    let fixture: ComponentFixture<VehicleHeadCountCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleHeadCountCreateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleHeadCountCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
