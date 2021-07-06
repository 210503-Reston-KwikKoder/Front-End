import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ChatService } from 'src/Services/chat.service';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  class MockChatService{
    sendMessage(param1: any, param2: any, param3: any) {}
    getMessages = () => {
      return new Observable<any>();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      providers:[
        {provide: ChatService, useClass: MockChatService }
      ]
    })
    .compileComponents();
    chatService = TestBed.inject(ChatService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
