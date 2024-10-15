import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePriceListComponent } from './zone-price-list.component';

describe('ZonePriceListComponent', () => {
  let component: ZonePriceListComponent;
  let fixture: ComponentFixture<ZonePriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
