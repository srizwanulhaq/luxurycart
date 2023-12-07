import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProblemMainComponent } from './reportp-main.component';

describe('ReportProblemMainComponent', () => {
    let component: ReportProblemMainComponent;
    let fixture: ComponentFixture<ReportProblemMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReportProblemMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportProblemMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
