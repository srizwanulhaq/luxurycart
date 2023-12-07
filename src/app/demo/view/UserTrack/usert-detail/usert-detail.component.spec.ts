import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrackDetailComponent } from './usert-detail.component';

describe('UserTrackDetailComponent', () => {
    let component: UserTrackDetailComponent;
    let fixture: ComponentFixture<UserTrackDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserTrackDetailComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTrackDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
