import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTicketListComponent } from './game-ticket-list.component';

describe('GameTicketListComponent', () => {
  let component: GameTicketListComponent;
  let fixture: ComponentFixture<GameTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTicketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
