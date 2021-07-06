import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueComponent } from './que.component';
import { QueService } from 'src/Services/que.service';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { ActiveCompComponent } from 'src/app/pages/active-comp/active-comp.component';
import { Observable } from 'rxjs';

describe('QueComponent', () => {
  let component: QueComponent;
  let fixture: ComponentFixture<QueComponent>;
  let queue: QueService;
  let http: HttpClient;
  let socket : Socket;
  let activeComp: ActiveCompComponent;
;
  class MockQueService {
    getQueueUserNames(id : number) {
      return new Promise<any>((resolve, reject) => {
      })
    }
    removeUserFromQueue(id : number) {
      return new Promise<any>((resolve, reject) => {
      })
    }

    listenForQueueUpdates() {
      return new Observable<any>();
    }

    alertQueueChangeToSocket(id: number) {}
  }
  class MockHttp {}
  class MockSocket {}
  class MockActiveComp {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueComponent ],
      providers: [
        {provide: QueService, useClass: MockQueService},
        {provide: HttpClient, useClass: MockHttp},
        {provide: Socket, useClass: MockSocket},
        {provide: ActiveCompComponent, useClass: MockActiveComp},
      ]
    })
    .compileComponents();
    queue = TestBed.inject(QueService);
    http = TestBed.inject(HttpClient);
    socket = TestBed.inject(Socket);
    activeComp = TestBed.inject(ActiveCompComponent);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
