import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferCreateComponent } from './special-offer-create.component';

describe('SpecialOfferCreateComponent', () => {
  let component: SpecialOfferCreateComponent;
  let fixture: ComponentFixture<SpecialOfferCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOfferCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
