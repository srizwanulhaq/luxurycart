import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideListingComponent } from './ride-listing.component';

describe('RideListingComponent', () => {
  let component: RideListingComponent;
  let fixture: ComponentFixture<RideListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
