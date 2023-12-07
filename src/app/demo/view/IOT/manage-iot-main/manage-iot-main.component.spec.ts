import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIotMainComponent } from './manage-iot-main.component';

describe('ManageIotMainComponent', () => {
  let component: ManageIotMainComponent;
  let fixture: ComponentFixture<ManageIotMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIotMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIotMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
