import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCommandMainComponent } from './pending-command-main.component';

describe('PendingCommandMainComponent', () => {
  let component: PendingCommandMainComponent;
  let fixture: ComponentFixture<PendingCommandMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCommandMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCommandMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
