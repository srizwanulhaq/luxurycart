import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePriceAddComponent } from './zone-price-add.component';

describe('ZonePriceAddComponent', () => {
  let component: ZonePriceAddComponent;
  let fixture: ComponentFixture<ZonePriceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePriceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePriceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
