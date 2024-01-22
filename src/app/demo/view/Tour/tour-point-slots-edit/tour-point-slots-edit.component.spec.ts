import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPointSlotsEditComponent } from './tour-point-slots-edit.component';

describe('TourPointSlotsEditComponent', () => {
  let component: TourPointSlotsEditComponent;
  let fixture: ComponentFixture<TourPointSlotsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPointSlotsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPointSlotsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
