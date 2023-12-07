import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAlertsComponent } from './customer-alerts.component';

describe('CustomerAlertsComponent', () => {
  let component: CustomerAlertsComponent;
  let fixture: ComponentFixture<CustomerAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
