import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRevenueMainComponent } from './partner-revenue-main.component';

describe('PartnerRevenueMainComponent', () => {
  let component: PartnerRevenueMainComponent;
  let fixture: ComponentFixture<PartnerRevenueMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRevenueMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRevenueMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
