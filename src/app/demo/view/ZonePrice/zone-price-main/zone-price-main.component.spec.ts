import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePriceMainComponent } from './zone-price-main.component';

describe('ZonePriceMainComponent', () => {
  let component: ZonePriceMainComponent;
  let fixture: ComponentFixture<ZonePriceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePriceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePriceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
