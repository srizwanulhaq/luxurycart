import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRequestMainComponent } from './rent-request-main.component';

describe('RentRequestMainComponent', () => {
  let component: RentRequestMainComponent;
  let fixture: ComponentFixture<RentRequestMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentRequestMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
