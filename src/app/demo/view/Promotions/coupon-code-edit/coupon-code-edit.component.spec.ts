import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeEditComponent } from './coupon-code-edit.component';

describe('CouponCodeEditComponent', () => {
  let component: CouponCodeEditComponent;
  let fixture: ComponentFixture<CouponCodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
