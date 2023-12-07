import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationCreateComponent } from './pnoti-create.component';

describe('NotificationCreateComponent', () => {
    let component: PushNotificationCreateComponent;
    let fixture: ComponentFixture<PushNotificationCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PushNotificationCreateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PushNotificationCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
