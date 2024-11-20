import { TestBed } from '@angular/core/testing';

import { KeyFactorService } from './keyfactor.service';

describe('KeyfactorService', () => {
  let service: KeyFactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyFactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
