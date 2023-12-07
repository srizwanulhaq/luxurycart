import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeListingComponent } from './coupon-code-listing.component';

describe('CouponCodeListingComponent', () => {
  let component: CouponCodeListingComponent;
  let fixture: ComponentFixture<CouponCodeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
