import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMainComponent } from './zone-main.component';

describe('ZoneMainComponent', () => {
  let component: ZoneMainComponent;
  let fixture: ComponentFixture<ZoneMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
