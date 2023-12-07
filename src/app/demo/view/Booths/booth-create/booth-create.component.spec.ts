import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothCreateComponent } from './booth-create.component';

describe('BoothCreateComponent', () => {
  let component: BoothCreateComponent;
  let fixture: ComponentFixture<BoothCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
