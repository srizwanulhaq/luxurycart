import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiMainComponent } from './tour-main.component';

describe('TaxiMainComponent', () => {
  let component: TaxiMainComponent;
  let fixture: ComponentFixture<TaxiMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
