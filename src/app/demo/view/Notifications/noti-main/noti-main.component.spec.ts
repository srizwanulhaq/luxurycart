import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMainComponent } from './noti-main.component';

describe('NotificationMainComponent', () => {
    let component: NotificationMainComponent;
    let fixture: ComponentFixture<NotificationMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
