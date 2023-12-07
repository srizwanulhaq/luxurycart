import { TestBed } from '@angular/core/testing';

import { VehicleCommandService } from './vehicle-command.service';

describe('VehicleCommandService', () => {
  let service: VehicleCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
