import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationMainComponent } from './pnoti-main.component';

describe('PushNotificationMainComponent', () => {
    let component: PushNotificationMainComponent;
    let fixture: ComponentFixture<PushNotificationMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PushNotificationMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PushNotificationMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
