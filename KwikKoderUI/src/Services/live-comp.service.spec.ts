import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LiveCompService } from './live-comp.service';
import { Socket } from 'ngx-socket-io';

describe('LiveCompService', () => {
  let service: LiveCompService;
  let httpTestingController: HttpTestingController;
  let socket: Socket;
  class MockSocket{}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Socket, useClass: MockSocket}
      ]
    });
    service = TestBed.inject(LiveCompService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
