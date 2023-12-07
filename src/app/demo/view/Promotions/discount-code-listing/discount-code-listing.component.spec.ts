import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeListingComponent } from './discount-code-listing.component';

describe('DiscountCodeListingComponent', () => {
  let component: DiscountCodeListingComponent;
  let fixture: ComponentFixture<DiscountCodeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
