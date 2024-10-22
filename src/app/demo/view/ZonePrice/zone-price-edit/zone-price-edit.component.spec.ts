import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePriceEditComponent } from './zone-price-edit.component';

describe('ZonePriceEditComponent', () => {
  let component: ZonePriceEditComponent;
  let fixture: ComponentFixture<ZonePriceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonePriceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
