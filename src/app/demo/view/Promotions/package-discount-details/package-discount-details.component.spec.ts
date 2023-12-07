import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDiscountDetailsComponent } from './package-discount-details.component';

describe('PackageDiscountDetailsComponent', () => {
  let component: PackageDiscountDetailsComponent;
  let fixture: ComponentFixture<PackageDiscountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDiscountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
