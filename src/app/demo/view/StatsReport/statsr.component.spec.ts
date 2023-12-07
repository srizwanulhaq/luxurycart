import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsReportComponent } from './statsr.component';

describe('StatsReportComponent', () => {
    let component: StatsReportComponent;
    let fixture: ComponentFixture<StatsReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StatsReportComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
