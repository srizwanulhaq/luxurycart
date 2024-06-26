import { TestBed } from '@angular/core/testing';

import { NamedObservableService } from './named-observable.service';

describe('NamedObservableService', () => {
  let service: NamedObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamedObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
