import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleActionSendComponent } from './vehicle-action-send.component';

describe('VehicleActionSendComponent', () => {
    let component: VehicleActionSendComponent;
    let fixture: ComponentFixture<VehicleActionSendComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleActionSendComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleActionSendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
