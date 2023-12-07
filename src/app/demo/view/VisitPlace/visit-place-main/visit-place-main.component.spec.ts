import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlaceMainComponent } from './visit-place-main.component';

describe('VisitPlaceMainComponent', () => {
  let component: VisitPlaceMainComponent;
  let fixture: ComponentFixture<VisitPlaceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPlaceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlaceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
