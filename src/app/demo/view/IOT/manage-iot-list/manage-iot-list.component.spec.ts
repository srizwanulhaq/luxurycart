import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIotListComponent } from './manage-iot-list.component';

describe('ManageIotListComponent', () => {
  let component: ManageIotListComponent;
  let fixture: ComponentFixture<ManageIotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
