import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePathComponent } from './ride-path.component';

describe('RidePathComponent', () => {
  let component: RidePathComponent;
  let fixture: ComponentFixture<RidePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
