import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { Socket } from 'ngx-socket-io';

describe('ChatService', () => {
  let service: ChatService;
  let socket : Socket;

  class MockSocket {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Socket, useClass: MockSocket},
      ]
    });
    service = TestBed.inject(ChatService);
    socket = TestBed.inject(Socket);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
