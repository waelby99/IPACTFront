import { TestBed } from '@angular/core/testing';

import { TutorielService } from './tutoriel.service';

describe('TutorielService', () => {
  let service: TutorielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
