import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionListingsComponent } from './promotion-listings.component';

describe('PackageListingsComponent', () => {
  let component: PromotionListingsComponent;
  let fixture: ComponentFixture<PromotionListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
