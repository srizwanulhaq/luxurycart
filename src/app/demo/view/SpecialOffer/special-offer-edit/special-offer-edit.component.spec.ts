import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOfferEditComponent } from './special-offer-edit.component';

describe('SpecialOfferEditComponent', () => {
  let component: SpecialOfferEditComponent;
  let fixture: ComponentFixture<SpecialOfferEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialOfferEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOfferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
