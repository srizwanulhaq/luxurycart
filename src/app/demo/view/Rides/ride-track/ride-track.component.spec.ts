import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideTrackComponent } from './ride-track.component';

describe('RideTrackComponent', () => {
  let component: RideTrackComponent;
  let fixture: ComponentFixture<RideTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
