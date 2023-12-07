import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSettleBonusComponent } from './customer-settle-bonus.component';

describe('CustomerSettleBonusComponent', () => {
  let component: CustomerSettleBonusComponent;
  let fixture: ComponentFixture<CustomerSettleBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSettleBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSettleBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
