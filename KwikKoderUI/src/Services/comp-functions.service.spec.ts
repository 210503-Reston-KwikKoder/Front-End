import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, getTestBed, TestBed } from '@angular/core/testing';
import { observable, Observable, of, timer } from 'rxjs';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';

import { CompFunctionsService } from './comp-functions.service';
import { RestService } from './rest.service';
import { environment as env } from '../environments/environment';
import { LiveCompService } from './live-comp.service'
import { QueService } from './que.service'
import { Language } from 'src/Models/LanguageEnum';
import { TestMaterial } from 'src/Models/TestMaterial';
import { keyframes } from '@angular/animations';

describe('CompFunctionsService', () => {
  let service: CompFunctionsService;
  let rest: RestService;
  let httpTestingController: HttpTestingController;
  let liveSer: LiveCompService;
  let queueService: QueService;
  class MockRestService
  {
    getCompetitionContent(id: number):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    };
    postCompetitionResults(model : CompetitionTestResults){};
    getTestContentByCatagoryId(any : any):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    }
  }

  class MockQueService{

  }

  class MockLiveCompService{
    alertReset(id: number) {}
    alertNewTest(any: any) {}
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        {provide: RestService, useClass: MockRestService},
        {provide: QueService, useClass: MockQueService},
        {provide: LiveCompService, useClass: MockLiveCompService},
      ]
    });

    service = TestBed.inject(CompFunctionsService);
    rest = TestBed.inject(RestService);
    httpTestingController = TestBed.get(HttpTestingController);
    queueService = TestBed.inject(QueService);
    liveSer = TestBed.inject(LiveCompService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('resetTimer should reset', () => {
    service.resetTimer();
    expect(service.timer.minutes).toBe(0);
    expect(service.timer.seconds).toBe(30);
  });

  it('resetState should reset', () => {
    let test = service.resetState();
    expect(test.words).toEqual('');
    expect(test.wordarray).toEqual(new Array());
    expect(test.typedarray).toEqual(new Array());
    expect(test.enteredText).toEqual('');
    expect(test.errors).toEqual(0);
    expect(test.started).toEqual(false);
    expect(test.startTime).toEqual(null);
    expect(test.timeTaken).toEqual(0);
    expect(test.letterPosition).toEqual(0);
    expect(test.finished).toEqual(false);
    expect(test.correctchars).toEqual(0);
  });

  it('resetTest should reset ', () => {
    service.compId = 1;
    service.resetTest();
    expect(service.testComplete).toEqual(false);
    expect(service.newTest()).toHaveBeenCalled;
  });

  it('callReset should call alertReset', () => {
    service.compId = 1;
    service.callReset();
    expect(service.liveSer.alertReset(service.compId)).toHaveBeenCalled;
  });

  it('finishTest should call clearInterval', () => {
    service.intervalId = 1;
    service.finishTest();
    expect(service.testComplete).toEqual(true);
    expect(clearInterval(service.intervalId)).toHaveBeenCalled;
  });


  it('newTest should call', () => {
    service.newTest();
    expect(service.winnerWpm).toEqual(0);
    expect(service.challengerWpm).toEqual(0);
    expect(service.testmat).toEqual(undefined);
    expect(service.challengerState).toEqual(service.resetState());
    expect(service.winnerState).toEqual(service.resetState());
    expect(service.resetTimer).toHaveBeenCalled;
    expect(service.testStarted).toEqual(false);
    expect(service.expectSpace).toEqual(false);
    expect(service.skip).toEqual(false);

    service.category = null;
    rest.getTestContentByCatagoryId(service.category).then(
      obj => {
        expect(obj).toBeFalsy;
      }
    )

    service.category = 1;
    rest.getTestContentByCatagoryId(service.category).then(
      obj => {
        expect(service.testmat).toEqual(obj);
        expect(service.testmat.snippet).toEqual(service.randomSnippet(obj.content, 10));
      }
    )
  });

  it('startRound should call', () =>{
    var roomId = 1;
    service.category = 1;
    let testMaterial : TestMaterial = {
      catagoryId: 1,
      content: "string",
      author: "string",
      length: 1
    }

    service.testmat = testMaterial;
    service.startRound(1);

    let test:any = {
      compId: roomId,
      category: service.category ,
      categoryName: Language[service.category],
      testString: service.testmat.snippet,
      testAuthor: service.testmat.author
    };
    expect(service.liveSer.alertNewTest(test)).toHaveBeenCalled;
  })

  it('startTest should call', () => {
    let state = {
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
    service.winnerState = state;
    service.challengerState = state;
    service.startTest();
    expect(service.testStarted).toEqual(true);
    expect(service.winnerState.started).toEqual(true);
    expect(service.challengerState.started).toEqual(true);
    expect(service.winnerState.startTime).toBeTruthy;
    expect(service.challengerState.startTime).toBeTruthy;
    expect(service.startTimer()).toHaveBeenCalled;
  })

  it ('formatTest should call', () => {
      let test = {
        testString: "some"
      }
      let state = {
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
    };
    let target = service.formatTest(test, state);
    expect(state.words).toEqual(test.testString);
    expect(state.wordarray).toEqual(state.words.split(''));
  })

  it ('randomSnippet should get random starting point', () => {
    let test = "\n \n";
    let lineLength = 1;
    let target = service.randomSnippet(test, lineLength);
    expect(target).not.toEqual(test);
  })

  it ('randomSnippet should not get random starting point', () => {
    let test = "\n \n";
    let lineLength = 10;
    let target = service.randomSnippet(test, lineLength);
    expect(target).toEqual(test);
  })

  it ('ShowCaret should call', () => {
    let elem: HTMLElement;
    expect(service.ShowCaret(elem)).toBeUndefined;
  })

  it ('ShowCaret should show', () => {
    let elem: HTMLElement = document.createElement("p");
    let expected = "0.1em solid yellow";
    service.ShowCaret(elem);

    expect(elem.style.borderLeft).toEqual(expected);
    expect(elem.style.borderLeftColor).toEqual("yellow");
  })

  it ('ShowCaret should hide', () => {
    let elem: HTMLElement = document.createElement("p");
    let expected = "none transparent";
    service.HideCaret(elem);

    expect(elem.style.borderLeft).toEqual(expected);
    expect(elem.style.borderLeftColor).toEqual("transparent");
  })

  it('isBadChar should return false', () =>{
    let any : any = {};
    let test = service.checkIsBadChar("\r", 2, any);
    expect(test).toBeFalse();
  });

  it('isBadChar should return true', () =>{
    let any : any = {};
    let test = service.checkIsBadChar("r", 2, any);
    expect(test).toBeTrue();
  });

  it('calcWordsPerMinute should return right wpm', () => {
    let chars = 250
    let time = 60000
    let wpm = service.calcWordsPerMinute(chars, time);
    expect(wpm).toBe(50);
  });

  // it('onWordChange should set properties', () =>{
  //   let event = new KeyboardEvent('keydown', {key: 'k'});
  //   document.dispatchEvent(event);
  //   var userRole = "some";
  //   service.live = true;
  //   service.onWordChange(event, userRole);
  //   expect(service.sendStateToViewers(userRole)).toHaveBeenCalled;
  // });


  // it('checkIfFinished should return false based on state', () =>{
  //   var state = service.resetState();
  //   state.finished = true;
  //   state.wordarray = ["a", "b", "c"];
  //   state.letterPosition = 2;
  //   var test = service.checkIfFinished(state);
  //   expect(state.finished).toBe(false);
  // });

  // it('checkIfFinished should return true based on state', () =>{
  //   var state = service.resetState();
  //   state.finished = true;
  //   state.wordarray = ["a", "b", "c"];
  //   state.letterPosition = 4;
  //   var test = service.checkIfFinished(state);
  //   expect(state.finished).toBe(true);
  // });

  // it('observeIfCompFinished should create', () =>{
  //   service.state = {
  //     words: '',
  //     wordarray: new Array(),
  //     typedarray: new Array(),
  //     enteredText: '',
  //     errors: 0,
  //     started: false,
  //     startTime: null,
  //     timeTaken: 0,
  //     letterPosition: 0,
  //     finished: false,
  //     correctchars: 0
  //   }
  //   var fun = service.observeIfCompFinished();
  //   const isFinished = of(service.state.finished);
  //   var test = typeof fun;
  //   var expected = typeof isFinished;
  //   expect(test === expected).toBeTrue();
  // });


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
});
