import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestComponent } from './test.component';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { RestService } from 'src/Services/rest.service';
import { ActivatedRoute, Router, ɵangular_packages_router_router_o } from '@angular/router';
import { Observable } from 'rxjs';
import { DisplayCategoryPipe } from '../../pipes/display-category.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/Models/LanguageEnum';
import { state } from '@angular/animations';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let auth: AuthService;
  let rest: RestService;
  let router: Router;
  let dcp: DisplayCategoryPipe;
  class MockAuthService {}
  class MockRestService
  {
    postTestResults(){};
    getTestContentByCatagoryId(id: number):Promise<any>{
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
  interface MockResult {
    image : string;
    text : string;
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent, MockPipe ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: RestService, useClass: MockRestService},
        {provide: ActivatedRoute,useValue: {id: 0}},
        {provide: DisplayCategoryPipe, useClass: MockPipe}
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    auth = TestBed.inject(AuthService)
    rest = TestBed.inject(RestService)
    router = TestBed.inject(Router)
    dcp = TestBed.inject(DisplayCategoryPipe)
  });

  //beforeEach(() => {
    //fixture = TestBed.createComponent(TestComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
 // });

  it('should create component', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('ngOnInit should define result ', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    let expeted = "Keep working at typing!";
    expect(component.result.text).toBe(expeted);
  });

  it('ngOnInit should call newTest', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.newTest()).toHaveBeenCalled;
    expect(component.skip).toBe(false);
  });

  it('ngOnInit should set category', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    let expected = -1;
    expect(component.category).toBe(expected);
  });
  it('langSelected should define event', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let event = 32;
    component.langSelected(event);
    expect(component.category).toBe(event);
  });

  it('langSelected should call newTest', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let event = 32;
    component.langSelected(event);
    expect(component.newTest()).toHaveBeenCalled;
    expect(component.skip).toBe(false);
  });

  it('newTest should define properties', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.newTest();
    expect(component.state).toBeDefined;
    expect(component.wpm).toBe(0);
    expect(component.state.errors).toBe(0);
  });

  it('newTest should define categoryName', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.newTest();
    component.categoryName = "ActionScript";
    let test = component.categoryName;
    let expected = Language[1];
    expect(test).toBe(expected);
  });

  it('isBadChar should return false', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let test = component.isBadChar("\r", 2, "any");
    expect(test).toBeFalse();
  });

  it('isBadChar should return true', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let test = component.isBadChar("r", 2, "any");
    expect(test).toBeTrue();
  });

  it('wordsPerMinute should return right wpm', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    let chars = 250
    let time = 60000
    let wpm = component.wordsPerMinute(chars, time);
    expect(wpm).toBe(50);
  });

  it('checkIfFinished should return true based on state', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.state.wordarray = ["a", "b"];
    component.state.letterPosition = 3;
    component.state.startTime = new Date();
    let test = component.checkIfFinished();
    expect(test).toBeTrue();
  });

  it('checkIfFinished should return false based on state', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.state.wordarray = ["a", "b", "c"];
    component.state.letterPosition = 1;
    component.state.startTime = new Date();
    let test = component.checkIfFinished();
    expect(test).toBeFalse();
  });

  it('checkIfFinished should return true based on timerFinished', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.state.startTime = new Date();
    component.timerFinished = true;
    let test = component.checkIfFinished();
    expect(test).toBeTrue();
  });

  it('checkIfFinished should set state', () =>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.state.startTime = new Date();
    component.checkIfFinished();
    expect(component.state.finished).toBe(true);
  });

  it('pad should return digit more than 10', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let expected = 11;
    let test = component.pad(expected);
    expect(test).toBe(expected);
  });

  it('pad should return digit less than 10', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let expected = 9;
    let test = component.pad(expected);
    expect(test).toBe(`0${expected}`);
  });

  it('submitResults should return SlowResult', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.result = {
      image: "",
      text: ""
    }
    component.category = 1;
    component.state.correctchars = 100;
    component.state.errors = 0;
    component.timeTaken = 60000;
    component.wpm = 20;
    component.submitResults();
    expect(component.result.text).toBe("Keep working at typing!");
  });
  it('submitResults should return AverageResult', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.result = {
      image: "",
      text: ""
    }
    component.category = 1;
    component.state.correctchars = 200;
    component.state.errors = 0;
    component.timeTaken = 60000;
    component.wpm = 40;
    component.submitResults();
    expect(component.result.text).toBe("You're improving!");
  });
  it('submitResults should return AverageResult', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    }
    component.result = {
      image: "",
      text: ""
    }
    component.category = 1;
    component.state.correctchars = 400;
    component.state.errors = 0;
    component.timeTaken = 60000;
    component.wpm = 80;
    component.submitResults();
    expect(component.result.text).toBe("You're a programming genius!");
  });

  // it("interpolation for author should display", () => {
  //   let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#author');
  //   if(property.innerHTML)
  //     expect(property.innerHTML).not.toBeNull();
  // });

  it("interpolation for errors should display", () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#errors');
    if(property.innerHTML)
      expect(property.innerHTML).not.toBeNull();
  });

  it("interpolation for wpm should display", () => {
    let property: HTMLElement = fixture.debugElement.nativeElement.querySelector('#wpm');
    if(property.innerHTML)
      expect(property.innerHTML).not.toBeNull();
  });

});
