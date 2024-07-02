import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketMainComponent } from './event-ticket-main.component';

describe('EventTicketMainComponent', () => {
  let component: EventTicketMainComponent;
  let fixture: ComponentFixture<EventTicketMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTicketMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
