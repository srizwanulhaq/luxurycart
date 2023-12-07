import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChargeComponent } from './customer-charge.component';

describe('CustomerChargeComponent', () => {
  let component: CustomerChargeComponent;
  let fixture: ComponentFixture<CustomerChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
