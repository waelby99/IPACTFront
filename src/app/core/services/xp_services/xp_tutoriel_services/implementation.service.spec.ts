import { TestBed } from '@angular/core/testing';

import { ImplementationService } from './implementation.service';

describe('ImplementationService', () => {
  let service: ImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
