import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeListingComponent } from './promo-code-listing.component';

describe('PromoCodeListingComponent', () => {
  let component: PromoCodeListingComponent;
  let fixture: ComponentFixture<PromoCodeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
