import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPointSlotsCreateComponent } from './tour-point-slots-create.component';

describe('TourPointSlotsCreateComponent', () => {
  let component: TourPointSlotsCreateComponent;
  let fixture: ComponentFixture<TourPointSlotsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPointSlotsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPointSlotsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
