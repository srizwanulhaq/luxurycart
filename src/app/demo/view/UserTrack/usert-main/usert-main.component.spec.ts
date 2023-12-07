import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrackMainComponent } from './usert-main.component';

describe('UserTrackMainComponent', () => {
    let component: UserTrackMainComponent;
    let fixture: ComponentFixture<UserTrackMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserTrackMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTrackMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
