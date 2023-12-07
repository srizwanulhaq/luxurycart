import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyTemplateMainComponent } from './stemplate-main.component';

describe('ScrutinyTemplateMainComponent', () => {
    let component: ScrutinyTemplateMainComponent;
    let fixture: ComponentFixture<ScrutinyTemplateMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScrutinyTemplateMainComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrutinyTemplateMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
