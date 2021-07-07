import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForumService } from 'src/Services/forum.service';

import { ForumComponent } from './forum.component';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let forumService: ForumService;

  class MockCompFuncService{
    GetForumTitles(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ForumComponent ],
      providers: [
        {provide: ForumService, useClass: MockCompFuncService}
      ]
    })
    .compileComponents();
    forumService = TestBed.inject(ForumService);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
