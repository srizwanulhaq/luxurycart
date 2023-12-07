import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBonusComponent } from './customer-bonus.component';

describe('CustomerBonusComponent', () => {
  let component: CustomerBonusComponent;
  let fixture: ComponentFixture<CustomerBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
