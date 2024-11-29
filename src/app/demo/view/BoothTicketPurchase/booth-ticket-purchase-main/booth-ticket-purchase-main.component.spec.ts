import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothTicketPurchaseMainComponent } from './booth-ticket-purchase-main.component';

describe('TaxiMainComponent', () => {
  let component: BoothTicketPurchaseMainComponent;
  let fixture: ComponentFixture<BoothTicketPurchaseMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothTicketPurchaseMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothTicketPurchaseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
