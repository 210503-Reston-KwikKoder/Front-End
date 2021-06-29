import { TestBed } from '@angular/core/testing';

import { CompFunctionsService } from './comp-functions.service';

describe('CompFunctionsService', () => {
  let service: CompFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
