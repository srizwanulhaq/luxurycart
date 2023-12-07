import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeFormComponent } from './vtype-form.component';

describe('VehicleTypeFormComponent', () => {
    let component: VehicleTypeFormComponent;
    let fixture: ComponentFixture<VehicleTypeFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleTypeFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleTypeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
