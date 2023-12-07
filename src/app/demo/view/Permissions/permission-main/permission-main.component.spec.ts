import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionMainComponent } from './permission-main.component';

describe('PermissionMainComponent', () => {
  let component: PermissionMainComponent;
  let fixture: ComponentFixture<PermissionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
