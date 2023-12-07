import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeUsesListingComponent } from './code-uses-listing.component';

describe('CodeUsesListingComponent', () => {
    let component: CodeUsesListingComponent;
    let fixture: ComponentFixture<CodeUsesListingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CodeUsesListingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeUsesListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
