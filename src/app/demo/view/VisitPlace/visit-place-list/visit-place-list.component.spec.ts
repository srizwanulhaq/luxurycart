import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPlaceListComponent } from './visit-place-list.component';

describe('VisitPlaceListComponent', () => {
  let component: VisitPlaceListComponent;
  let fixture: ComponentFixture<VisitPlaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPlaceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitPlaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
