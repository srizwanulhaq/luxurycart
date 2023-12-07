import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportProblemListingComponent } from './reportp-listing.component';

describe('ReportProblemListingComponent', () => {
    let component: ReportProblemListingComponent;
    let fixture: ComponentFixture<ReportProblemListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReportProblemListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportProblemListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
