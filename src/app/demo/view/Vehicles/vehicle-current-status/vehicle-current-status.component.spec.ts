import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCurrentStatusComponent } from './vehicle-current-status.component';

describe('VehicleCurrentStatusComponent', () => {
  let component: VehicleCurrentStatusComponent;
  let fixture: ComponentFixture<VehicleCurrentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCurrentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
