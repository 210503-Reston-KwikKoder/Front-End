import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, getTestBed, TestBed } from '@angular/core/testing';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';

import { CompFunctionsService } from './comp-functions.service';
import { RestService } from './rest.service';

describe('CompFunctionsService', () => {
  let service: CompFunctionsService;
  let rest: RestService;

  class MockRestService
  {
    getCompetitionContent(id: number):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    };
    postCompetitionResults(model : CompetitionTestResults){};
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

});
