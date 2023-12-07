import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeDetailsComponent } from './coupon-code-details.component';

describe('CouponCodeDetailsComponent', () => {
  let component: CouponCodeDetailsComponent;
  let fixture: ComponentFixture<CouponCodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
