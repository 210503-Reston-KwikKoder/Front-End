import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTestComponent } from './competition-test.component';
import { AuthService } from '@auth0/auth0-angular';
import { RestService } from 'src/Services/rest.service';
import { ActivatedRoute, Router, ɵangular_packages_router_router_o } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayCategoryPipe } from '../../pipes/display-category.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';



describe('CompetitionTestComponent', () => {
  let component: CompetitionTestComponent;
  let fixture: ComponentFixture<CompetitionTestComponent>;
  let auth: AuthService;
  let rest: RestService;
  let router: Router;
  let dcp: DisplayCategoryPipe;
  let route : ActivatedRoute;

  class MockAuthService {}

  class MockActivatedRoute{
    params = new Observable<any>();
  }

  class MockRestService
  {
    //put api calls here if you want to test them
    getCompetitionContent(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {})
    };
  }

  @Pipe({name: 'displayCategory'})
    class MockPipe implements PipeTransform {
        transform(value: number): number {
            //Do stuff here, if you want
            return value;
        }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionTestComponent, MockPipe],

      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: RestService, useClass: MockRestService},
        //{provide: ActivatedRoute,useValue: {id: 0}},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: DisplayCategoryPipe, useClass: MockPipe},
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();

    rest = TestBed.inject(RestService);
    route = TestBed.inject(ActivatedRoute);

  });

  it('should create', ()=>{
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('testWPM', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let chars = 250
    let time = 60000
    let wpm = component.wordsPerMinute(chars, time);
    expect(wpm).toBe(50);
  });

  it('langSelected should create', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let event = 32;
    component.langSelected(event);
    expect(component.category).toBe(event);
    expect(component.newTest()).toBeDefined;
  });

  it('ngOnInit should instantiate properties ', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.sub).toBeDefined;
    expect(component.newTest()).toBeDefined;
    expect(component.compId).toBeDefined;
  });


});

