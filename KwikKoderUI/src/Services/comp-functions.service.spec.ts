import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, getTestBed, TestBed } from '@angular/core/testing';
import { observable, Observable, of } from 'rxjs';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';

import { CompFunctionsService } from './comp-functions.service';
import { RestService } from './rest.service';
import { environment as env } from '../environments/environment';


describe('CompFunctionsService', () => {
  let service: CompFunctionsService;
  let rest: RestService;
  let httpTestingController: HttpTestingController;
  class MockRestService
  {
    getCompetitionContent(id: number):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    };
    postCompetitionResults(model : CompetitionTestResults){};
  }

  var dummyState =
  {
    words: "any",
    wordarray: ["a", "b"],
    typedarray: ["a", "b"],
    enteredText: '',
    errors: 0,
    started: false,
    startTime: null,
    timeTaken: 0,
    letterPosition: 0,
    finished: false,
    correctchars: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        {provide: RestService, useClass: MockRestService}
      ]
    });

    service = TestBed.inject(CompFunctionsService);
    rest = TestBed.inject(RestService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call', () => {
    expect(service.newTest()).toHaveBeenCalled;
  });

  it('isBadChar should return false', () =>{
    let test = service.checkIsBadChar("\r", 2, "any");
    expect(test).toBeFalse();
  });

  it('isBadChar should return true', () =>{
    let test = service.checkIsBadChar("r", 2, "any");
    expect(test).toBeTrue();
  });

  it('calcWordsPerMinute should return right wpm', () => {
    let chars = 250
    let time = 60000
    let wpm = service.calcWordsPerMinute(chars, time);
    expect(wpm).toBe(50);
  });

  it('newTest should define properties', () =>{
    service.newTest();
    expect(service.state).toBeDefined;
    expect(service.wpm).toBe(0);
    expect(service.state.errors).toBe(0);
  });

  it('checkIfFinished should return false based on state', () =>{
    service.state = {
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
    service.state.wordarray = ["a", "b", "c"];
    service.state.letterPosition = 1;
    service.state.startTime = new Date();
    let test = service.checkIfFinished();
    expect(test).toBeFalse();
  });

  it('checkIfFinished should return true based on state', () =>{
    service.state = {
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
    service.state.wordarray = ["a", "b"];
    service.state.letterPosition = 3;
    service.state.startTime = new Date();
    let test = service.checkIfFinished();
    expect(test).toBeTrue();
  });

  it('observeIfCompFinished should create', () =>{
    service.state = {
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
    service.state.finished = true;
    var test = spyOn(service, 'observeIfCompFinished').and.returnValue;
    expect(test).toBeTruthy();
  });

  it('getCompetitionContent should call getCompetitionContent', () =>{
    service.state = {
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
    var test : CompetitionContent = {
      id: 1,
      testString: 'string',
      author: 'string',
      categoryId: 1
    }
    rest.getCompetitionContent(1);
    service.category = test.id
    service.compId = test.id
    service.author = test.author
    service.state.words = test.testString
    service.state.wordarray = service.state.words.split('');
    service.state.wordarray= service.state.wordarray.filter(service.checkIsBadChar);
    expect(service.category).toBe(test.categoryId);
  });

  // it("should return data", () => {
  //   var result : CompetitionContent = {
  //     id: 1,
  //     testString: 'string',
  //     author: 'string',
  //     categoryId: 1
  //   }
  //   let baseUrl = "https://kwickkoderrest.azurewebsites.net/api/CompetitonStats/"
  //   rest.getCompetitionContent(1).then(res => {
  //     expect(res).toEqual(result)
  //   });

  //   const req = httpTestingController.expectOne({
  //     method: "GET",
  //     url: `${baseUrl}${1}`
  //   });

  //   expect(req.request.method).toEqual("GET");
  //   req.flush(result);
  // });

    // rest.getCompetitionContent(1).then((res) => {
    //   service.category = res.id
    //   service.compId = res.id
    //   service.author = res.author
    //   service.state.words = res.testString
    //   service.state.wordarray = service.state.words.split('');
    //   service.state.wordarray= service.state.wordarray.filter(service.checkIsBadChar);
    // }).catch((res) => {
    //   service.category = 1;
    // }
    // );

 it('onWordChange should set properties', () =>{
  var target = new KeyboardEvent('keydown', { code : " "});
  service.state = {
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
  service.state.finished = true;
  expect(service.onWordChange(target)).toHaveBeenCalled;
 });

});
