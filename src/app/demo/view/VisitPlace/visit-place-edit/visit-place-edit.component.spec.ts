import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlaceEditComponent } from './visit-place-edit.component';

describe('VisitPlaceEditComponent', () => {
  let component: VisitPlaceEditComponent;
  let fixture: ComponentFixture<VisitPlaceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPlaceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
