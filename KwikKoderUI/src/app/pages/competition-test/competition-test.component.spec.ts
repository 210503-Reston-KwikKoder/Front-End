import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionTestComponent } from './competition-test.component';
import { AuthService } from '@auth0/auth0-angular';
import { RestService } from 'src/Services/rest.service';
import { ActivatedRoute, Router, ɵangular_packages_router_router_o } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayCategoryPipe } from '../../pipes/display-category.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CompetitionTestComponent', () => {
  let component: CompetitionTestComponent;
  let fixture: ComponentFixture<CompetitionTestComponent>;
  let auth: AuthService;
  let rest: RestService;
  let router: Router;
  let dcp: DisplayCategoryPipe;
  let route : ActivatedRoute;
  let httpTestingController: HttpTestingController;

  class MockAuthService {}

  class MockRestService
  {
    getCompetitionContent(id: number):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    };
  }

  class MockActivatedRoute{
    params = new Observable<any>();
  }

  @Pipe({name: 'displayCategory'})
    class MockPipe implements PipeTransform{
      transform(value: number): number{
        return value;
      }
    }

  beforeEach(() => {
    TestBed.configureTestingModule(
    {
      declarations: [ CompetitionTestComponent, MockPipe],

      imports: [RouterTestingModule, HttpClientTestingModule],

      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: RestService, useClass: MockRestService},
        //{provide: ActivatedRoute,useValue: {id: 0}},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: DisplayCategoryPipe, useClass: MockPipe},
      ]

    }).compileComponents();

    rest = TestBed.inject(RestService);
    route = TestBed.inject(ActivatedRoute);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should create component', ()=>{
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('langSelected should define event', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let event = 32;
    component.langSelected(event);
    expect(component.category).toBe(event);
  });

  it('langSelected should call newTest', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let event = 32;
    component.langSelected(event);
    expect(component.newTest()).toHaveBeenCalled;
    expect(component.skip).toBe(false);
  });

  it('ngOnInit should define sub ', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.sub).toBeDefined;
    expect(component.compId).not.toBeNull();
  });

  it('ngOnInit should call newTest', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.newTest()).toHaveBeenCalled;
    expect(component.skip).toBe(false);
  });

  it('ngOnInit should set compId', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.compId).not.toBeNull();
  });

  // it('ngOnInit should addEventListener', () => {
  //   fixture = TestBed.createComponent(CompetitionTestComponent);
  //   component = fixture.componentInstance;
  //   const keyEvent = new KeyboardEvent('keydown', { key: " " });
  //   if (component.state) {
  //     component.ngOnInit();
  //     component.keyIntercept(keyEvent);
  //     let pre = fixture.debugElement.nativeElement.querySelector('pre');
  //     expect(pre).toBe(keyEvent.preventDefault());
  //   }
  // });

  it('newTest should define properties', () =>{
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    component.newTest();
    expect(component.state).toBeDefined;
    expect(component.wpm).toBe(0);
    expect(component.state.errors).toBe(0);
  });

  it('isBadChar should return false', () =>{
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let test = component.isBadChar("\r", 2, "any");
    expect(test).toBeFalse();
  });

  it('isBadChar should return true', () =>{
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let test = component.isBadChar("r", 2, "any");
    expect(test).toBeTrue();
  });

  it('wordsPerMinute should return right wpm', () => {
    fixture = TestBed.createComponent(CompetitionTestComponent);
    component = fixture.componentInstance;
    let chars = 250
    let time = 60000
    let wpm = component.wordsPerMinute(chars, time);
    expect(wpm).toBe(50);
  });

  it("interpolation for category should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#category');
    expect(property.innerHTML).not.toBeNull();
  });

  it("interpolation for author should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#author');
    expect(property.innerHTML).not.toBeNull();
  });

  it("interpolation for author should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#author');
    expect(property.innerHTML).not.toBeNull();
  });

  it("interpolation for errors should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#errors');
    expect(property.innerHTML).not.toBeNull();
  });

  it("interpolation for wpm should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#wpm');
    expect(property.innerHTML).not.toBeNull();
  });

});

