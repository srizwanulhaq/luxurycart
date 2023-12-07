import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRideListComponent } from './customer-ride-list.component';

describe('CustomerRideListComponent', () => {
  let component: CustomerRideListComponent;
  let fixture: ComponentFixture<CustomerRideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRideListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
