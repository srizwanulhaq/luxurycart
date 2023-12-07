import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeDetailsComponent } from './discount-code-details.component';

describe('DiscountCodeDetailsComponent', () => {
  let component: DiscountCodeDetailsComponent;
  let fixture: ComponentFixture<DiscountCodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
