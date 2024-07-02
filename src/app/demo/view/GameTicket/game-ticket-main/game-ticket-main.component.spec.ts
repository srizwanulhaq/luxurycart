import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTicketMainComponent } from './game-ticket-main.component';

describe('GameTicketMainComponent', () => {
  let component: GameTicketMainComponent;
  let fixture: ComponentFixture<GameTicketMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTicketMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTicketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
