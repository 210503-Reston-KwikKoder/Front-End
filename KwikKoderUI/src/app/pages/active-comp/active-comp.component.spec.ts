import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCompComponent } from './active-comp.component';
import { QueService } from 'src/Services/que.service';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { CompFunctionsService } from 'src/Services/comp-functions.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/Services/chat.service';
import { Observable, Subscription } from 'rxjs';

describe('ActiveCompComponent', () => {
  let component: ActiveCompComponent;
  let fixture: ComponentFixture<ActiveCompComponent>;
  let queue: QueService;
  let http: HttpClient;
  let socket : Socket;
  let comp: CompFunctionsService;
  let route: ActivatedRoute;
  let chatService: ChatService;

  class MockQueService {}
  class MockHttp{}
  class MockSocket {}
  class MockChatService {
    joinSocketRoom(id : any) {};
    getMessages = () => {
      return new Observable<any>();
    }
  }

  class MockCompFuncService {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCompComponent ],
      providers: [
        {provide: ActivatedRoute,
        useValue: {snapshot: {paramMap: { get(any : any){} }}}
        },
        {provide: queue, useClass: MockQueService},
        {provide: HttpClient, useClass: MockHttp},
        {provide: Socket, useClass: MockSocket},
        {provide: ChatService, useClass: MockChatService},
        {provide: CompFunctionsService, useClass: MockCompFuncService},
      ]
    })
    .compileComponents();
    queue = TestBed.inject(QueService);
    http = TestBed.inject(HttpClient);
    socket = TestBed.inject(Socket);
    route = TestBed.inject(ActivatedRoute);
    chatService = TestBed.inject(ChatService);
    comp = TestBed.inject(CompFunctionsService);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    expect(component.joinSocketRoom()).toHaveBeenCalled;
    expect(component.SetMessageWatch()).toHaveBeenCalled;
  });

  // it('...', () => {
  //   spyOn(chatService, 'getMessages').and.callFake;
  //   // do stuff
  //   expect(chatService.getMessages).toHaveBeenCalled();
  // })

});
