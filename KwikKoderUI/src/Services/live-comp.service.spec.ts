import { TestBed } from '@angular/core/testing';

import { LiveCompService } from './live-comp.service';

describe('LiveCompService', () => {
  let service: LiveCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
