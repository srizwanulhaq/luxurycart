import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothDetailsComponent } from './booth-details.component';

describe('BoothDetailsComponent', () => {
  let component: BoothDetailsComponent;
  let fixture: ComponentFixture<BoothDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
