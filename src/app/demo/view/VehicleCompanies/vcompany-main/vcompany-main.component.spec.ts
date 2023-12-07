import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCompanyMainComponent } from './vcompany-main.component';

describe('VehicleCompanyMainComponent', () => {
    let component: VehicleCompanyMainComponent;
    let fixture: ComponentFixture<VehicleCompanyMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleCompanyMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleCompanyMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
