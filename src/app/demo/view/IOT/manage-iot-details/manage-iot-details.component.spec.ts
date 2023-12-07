import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIotDetailsComponent } from './manage-iot-details.component';

describe('ManageIotDetailsComponent', () => {
  let component: ManageIotDetailsComponent;
  let fixture: ComponentFixture<ManageIotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIotDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
