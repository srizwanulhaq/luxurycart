import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothMainComponent } from './booth-main.component';

describe('BoothMainComponent', () => {
  let component: BoothMainComponent;
  let fixture: ComponentFixture<BoothMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
