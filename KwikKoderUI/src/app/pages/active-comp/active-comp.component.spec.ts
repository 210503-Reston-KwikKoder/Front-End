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
  class MockHttp{
    delete(){}
  }
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

  it('keyIntercept should call onWordChange', () => {
    var event = KeyboardEvent;
    spyOn(component, 'keyIntercept').and.callFake(function(e) {
      if (event)
        spyOn(comp, 'onWordChange').and.callFake;
        expect(comp.onWordChange).toHaveBeenCalled();
    })
  })

  it('focusInputArea should call getElementById', () => {
    var event = KeyboardEvent;
    spyOn(component, 'keyIntercept').and.callFake;
    expect(document.getElementById("input-area")).toHaveBeenCalled;
  })

  it('messageList should add', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    var expected = "abc";
    component.messageList.push(expected);
    expect(component.messageList[0]).toBe(expected);
  })

  it('keydown should be false on ngOnInit', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake;
    var expected = KeyboardEvent;
    var test = document.documentElement.addEventListener('keydown', function (expected) {
      if ((expected.key) == " ") {
        expected.preventDefault();
      }
    }, false);
    expect(test).toBeFalsy();
  });

  it('messageInputHandler should call sendMessage', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    var event = KeyboardEvent;
    var expected = 13;
    spyOn(component, 'messageInputHandler').and.callFake(function(event) {
      event.keyCode = expected;
      if (event.keyCode == expected)
        expect(component.sendMessage()).toHaveBeenCalled;
    })
  })

  it('messageInputHandler should call newMessage ', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;    var event = KeyboardEvent;
    var expected = 0;
    spyOn(component, 'messageInputHandler').and.callFake(function(event) {
      event.keyCode = 13;
      if (event.keyCode != expected)
        expect(component.newMessage).toBe(" ");
    })
  })

  it('log should call ', () => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;    var event = KeyboardEvent;
    var expected = 0;
    spyOn(component, 'log').and.callFake(function(event) {
    })
    expect(component.log).toBeTruthy;
  })

});
