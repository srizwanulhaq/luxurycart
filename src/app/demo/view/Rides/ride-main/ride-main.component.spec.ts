import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideMainComponent } from './ride-main.component';

describe('RideMainComponent', () => {
  let component: RideMainComponent;
  let fixture: ComponentFixture<RideMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
