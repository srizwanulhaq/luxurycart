import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCommandListComponent } from './pending-command-list.component';

describe('PendingCommandListComponent', () => {
  let component: PendingCommandListComponent;
  let fixture: ComponentFixture<PendingCommandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCommandListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
