import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlaceCreateComponent } from './visit-place-create.component';

describe('VisitPlaceCreateComponent', () => {
  let component: VisitPlaceCreateComponent;
  let fixture: ComponentFixture<VisitPlaceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPlaceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlaceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
