import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPointSlotsMainComponent } from './tour-point-slots-main.component';

describe('TourPointSlotsMainComponent', () => {
  let component: TourPointSlotsMainComponent;
  let fixture: ComponentFixture<TourPointSlotsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPointSlotsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPointSlotsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
