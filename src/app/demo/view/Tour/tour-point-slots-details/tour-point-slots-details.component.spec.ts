import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPointSlotsDetailsComponent } from './tour-point-slots-details.component';

describe('TourPointSlotsDetailsComponent', () => {
  let component: TourPointSlotsDetailsComponent;
  let fixture: ComponentFixture<TourPointSlotsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPointSlotsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPointSlotsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
