import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRequestListComponent } from './rent-request-list.component';

describe('RentRequestListComponent', () => {
  let component: RentRequestListComponent;
  let fixture: ComponentFixture<RentRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
