import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';

import { QueService } from './que.service';

describe('QueService', () => {
  let service: QueService;
  let socket : Socket;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;

  class MockSocket {}
  class MockHttp{}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QueService,
        {provide: Socket, useClass: MockSocket},
        {provide: HttpClient, useClass: MockHttp}
      ]
    });
    service = TestBed.inject(QueService);
    socket = TestBed.inject(Socket);
    httpTestingController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
