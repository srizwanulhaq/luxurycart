import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMainComponent } from './city-main.component';

describe('CityMainComponent', () => {
  let component: CityMainComponent;
  let fixture: ComponentFixture<CityMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
