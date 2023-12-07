import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyTemplateFormComponent } from './stemplate-form.component';

describe('ScrutinyTemplateFormComponent', () => {
    let component: ScrutinyTemplateFormComponent;
    let fixture: ComponentFixture<ScrutinyTemplateFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScrutinyTemplateFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrutinyTemplateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
