import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothTicketPurchaseListComponent } from './booth-ticket-purchase-list.component';

describe('BoothTicketPurchaseListComponent', () => {
  let component: BoothTicketPurchaseListComponent;
  let fixture: ComponentFixture<BoothTicketPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothTicketPurchaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothTicketPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
