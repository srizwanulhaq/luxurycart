import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrackMapComponent } from './usert-map.component';

describe('UserTrackMapComponent', () => {
    let component: UserTrackMapComponent;
    let fixture: ComponentFixture<UserTrackMapComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserTrackMapComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTrackMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
