import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketMainComponent } from './supportt-main.component';

describe('SupportTicketMainComponent', () => {
    let component: SupportTicketMainComponent;
    let fixture: ComponentFixture<SupportTicketMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupportTicketMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportTicketMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
