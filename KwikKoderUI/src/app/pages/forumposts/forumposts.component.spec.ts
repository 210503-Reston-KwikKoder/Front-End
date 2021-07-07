import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { ForumService } from 'src/Services/forum.service';

import { ForumpostsComponent } from './forumposts.component';

describe('ForumpostsComponent', () => {
  let component: ForumpostsComponent;
  let fixture: ComponentFixture<ForumpostsComponent>;
  let forumService: ForumService;
  let auth : AuthService;

  class MockCompFuncService{
    GetForumTitles(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
    GetForumPostsById(id : number): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
    GetForumCommentsById(id : number): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
  }
  class MockAuthService {
    // user$: Observable<string> = of('')
    //idTokenClaims$: Observable<string> = of('')
    user$ = new Observable<any>();
   }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ ForumpostsComponent ],
      providers: [
        {provide: ForumService, useClass: MockCompFuncService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: ActivatedRoute, useValue: {params: { get(any : any){} }}},
      ]
    })
    .compileComponents();
    forumService = TestBed.inject(ForumService);
    auth = TestBed.inject(AuthService);

  });

  it('should create', () => {
    fixture = TestBed.createComponent(ForumpostsComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
