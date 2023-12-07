import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProblemDetailComponent } from './reportp-details.component';

describe('ReportProblemDetailComponent', () => {
  let component: ReportProblemDetailComponent;
  let fixture: ComponentFixture<ReportProblemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportProblemDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProblemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
