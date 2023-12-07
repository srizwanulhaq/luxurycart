import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiviyLoggingListingComponent } from './activityl-listing.component';

describe('ActiviyLoggingListingComponent', () => {
    let component: ActiviyLoggingListingComponent;
    let fixture: ComponentFixture<ActiviyLoggingListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActiviyLoggingListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiviyLoggingListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
