import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionListComponent } from './customer-transaction-list.component';

describe('CustomerTransactionListComponent', () => {
  let component: CustomerTransactionListComponent;
  let fixture: ComponentFixture<CustomerTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTransactionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
