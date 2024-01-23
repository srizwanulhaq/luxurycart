/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TourSlotsListComponent } from './tour-slots-list.component';

describe('TourSlotsListComponent', () => {
  let component: TourSlotsListComponent;
  let fixture: ComponentFixture<TourSlotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSlotsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
