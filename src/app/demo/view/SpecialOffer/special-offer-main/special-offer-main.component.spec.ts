import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferMainComponent } from './special-offer-main.component';

describe('SpecialOfferMainComponent', () => {
  let component: SpecialOfferMainComponent;
  let fixture: ComponentFixture<SpecialOfferMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOfferMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
