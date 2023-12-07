import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIotEditComponent } from './manage-iot-edit.component';

describe('ManageIotEditComponent', () => {
  let component: ManageIotEditComponent;
  let fixture: ComponentFixture<ManageIotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIotEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
