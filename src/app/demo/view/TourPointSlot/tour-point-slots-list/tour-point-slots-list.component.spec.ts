import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPointSlotsListComponent } from './tour-point-slots-list.component';

describe('TourPointSlotsListComponent', () => {
  let component: TourPointSlotsListComponent;
  let fixture: ComponentFixture<TourPointSlotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPointSlotsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPointSlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
