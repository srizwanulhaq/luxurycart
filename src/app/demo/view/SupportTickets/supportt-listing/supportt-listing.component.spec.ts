import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportTicketListingComponent } from './supportt-listing.component';

describe('SupportTicketListingComponent', () => {
    let component: SupportTicketListingComponent;
    let fixture: ComponentFixture<SupportTicketListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupportTicketListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportTicketListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
