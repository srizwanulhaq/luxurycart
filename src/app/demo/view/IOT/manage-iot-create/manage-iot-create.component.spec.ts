import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIotCreateComponent } from './manage-iot-create.component';

describe('ManageIotCreateComponent', () => {
  let component: ManageIotCreateComponent;
  let fixture: ComponentFixture<ManageIotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIotCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
