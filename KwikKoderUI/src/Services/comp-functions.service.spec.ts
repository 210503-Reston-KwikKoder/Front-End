import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, getTestBed, TestBed } from '@angular/core/testing';
import { observable, Observable, of } from 'rxjs';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';

import { CompFunctionsService } from './comp-functions.service';
import { RestService } from './rest.service';
import { environment as env } from '../environments/environment';
import { LiveCompService } from './live-comp.service'
import { QueService } from './que.service'

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
  }

  class MockQueService{

  }

  class MockLiveCompService{

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

  // it('newTest should call', () => {
  //   expect(service.newTest()).toHaveBeenCalled;
  // });

  // it('isBadChar should return false', () =>{
  //   let test = service.checkIsBadChar("\r", 2, "any");
  //   expect(test).toBeFalse();
  // });

  // it('isBadChar should return true', () =>{
  //   let test = service.checkIsBadChar("r", 2, "any");
  //   expect(test).toBeTrue();
  // });

  // it('calcWordsPerMinute should return right wpm', () => {
  //   let chars = 250
  //   let time = 60000
  //   let wpm = service.calcWordsPerMinute(chars, time);
  //   expect(wpm).toBe(50);
  // });

  // it('newTest should define properties', () =>{
  //   service.newTest();
  //   expect(service.winnerWpm).toBe(0);
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

  // it('onWordChange should set properties', () =>{
  //   var event = new KeyboardEvent('keydown', { code : " "});
  //   var userRole = "some";
  //   service.live = true;

  //   service.onWordChange(event, userRole);
  //   let state = service[userRole + 'State'];
  //   state.enteredText = event.key;

  //   let userState = {
  //     roomId: service.compId,
  //     state: state,
  //     role: userRole,
  //     wpm: service[userRole + 'Wpm']
  //   }
  //   expect(service.sendStateToViewers(userRole)).toHaveBeenCalled;

  // });

});
