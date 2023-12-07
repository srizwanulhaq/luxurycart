import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDiscountEditComponent } from './package-discount-edit.component';

describe('PackageDiscountEditComponent', () => {
  let component: PackageDiscountEditComponent;
  let fixture: ComponentFixture<PackageDiscountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDiscountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDiscountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
