import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueComponent } from './que.component';
import { QueService } from 'src/Services/que.service';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

describe('QueComponent', () => {
  let component: QueComponent;
  let fixture: ComponentFixture<QueComponent>;
  let queue: QueService;
  let http: HttpClient;
  let socket : Socket;

  class MockQueService {}
  class MockHttp {}
  class MockSocket {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueComponent ],
      providers: [
        {provide: QueService, useClass: MockQueService},
        {provide: HttpClient, useClass: MockHttp},
        {provide: Socket, useClass: MockSocket},
      ]
    })
    .compileComponents();
    queue = TestBed.inject(QueService);
    http = TestBed.inject(HttpClient);
    socket = TestBed.inject(Socket);

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
