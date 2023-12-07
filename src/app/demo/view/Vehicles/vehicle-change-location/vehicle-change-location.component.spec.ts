import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleChangeLocationComponent } from './vehicle-change-location.component';

describe('VehicleChangeLocationComponent', () => {
  let component: VehicleChangeLocationComponent;
  let fixture: ComponentFixture<VehicleChangeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleChangeLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleChangeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
