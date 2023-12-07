import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrackListingComponent } from './usert-listing.component';

describe('UserTrackListingComponent', () => {
    let component: UserTrackListingComponent;
    let fixture: ComponentFixture<UserTrackListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserTrackListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTrackListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
