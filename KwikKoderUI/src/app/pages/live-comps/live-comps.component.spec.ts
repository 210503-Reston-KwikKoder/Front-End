import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { LiveCompService } from 'src/Services/live-comp.service';

import { LiveCompsComponent } from './live-comps.component';

describe('LiveCompsComponent', () => {
  let component: LiveCompsComponent;
  let fixture: ComponentFixture<LiveCompsComponent>;
  let livComp: LiveCompService;
  let router: Router;

  class MockLiveCompService{
    getAllLiveCompRooms() {}
    createNewLiveCompRoom(any : any){}
  }
  class MockRoute{}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCompsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: LiveCompService, useClass: MockLiveCompService},
        {provide: Router, useClass: MockRoute}

      ]
    })
    .compileComponents();
    livComp = TestBed.inject(LiveCompService);
    router = TestBed.inject(Router);

  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LiveCompsComponent);
  //   component = fixture.componentInstance;
  // //  fixture.detectChanges();
  // });

  it('should create', () => {
    fixture = TestBed.createComponent(LiveCompsComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
