import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketTypeListingComponent } from './event-ticket-type-listing.component';

describe('EventTicketTypeListingComponent', () => {
  let component: EventTicketTypeListingComponent;
  let fixture: ComponentFixture<EventTicketTypeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTicketTypeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
