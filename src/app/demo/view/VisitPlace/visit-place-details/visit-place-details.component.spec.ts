import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlaceDetailsComponent } from './visit-place-details.component';

describe('VisitPlaceDetailsComponent', () => {
  let component: VisitPlaceDetailsComponent;
  let fixture: ComponentFixture<VisitPlaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPlaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
