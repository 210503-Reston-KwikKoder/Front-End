import { flush, getTestBed, TestBed } from '@angular/core/testing';
import { StatModel } from 'src/Models/StatModel';
import { TestMaterial } from 'src/Models/TestMaterial';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RestService } from './rest.service';
import { AuthService } from '@auth0/auth0-angular';
import { ɵɵsetComponentScope } from '@angular/core';
// import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { environment} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TestModel } from 'src/Models/TestModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';
import { CompModel } from 'src/Models/CompModel';
import { LBModel } from 'src/Models/LBModel';
import { Language } from 'src/Models/LanguageEnum';

describe('RestService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RestService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestService,
      ]
    });
    service = TestBed.inject(RestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getUserStats should get', () =>{
  //   const userStats = [{
  //     username : "A",
  //     userID: "1",
  //     averagewpm! : 50,
  //     averageaccuracy! : 60,
  //     numberoftests! : 4,
  //     totaltesttime! : 12,
  //     category: 0
  //   }]
  //     service.getUserStats().then(res =>{
  //       expect(res).toEqual(userStats)
  //     });
  //     const req = httpTestingController.expectOne(`${environment.dev.serverUrl}typetest/api/UserStat/all`);
  //     expect(req.request.method).toEqual("GET");
  //     req.flush(userStats);
  //     httpTestingController.verify();
  // });

  it('getLeaderBoardByCatagoryId should get', () =>{
    const test = [{
      userName : "A",
      name: "some string",
      averageWPM : 50,
      averageAcc : 60,
      ranking : 4
    }]
      var expected = 0;
      service.getLeaderBoardByCatagoryId(expected).then(res =>{
        expect(res).toEqual(test);
      });
      const req = httpTestingController.expectOne(`${environment.dev.serverUrl}LB/api/Leaderboard`);
      expect(req.request.method).toEqual("GET");
      req.flush(test);
      httpTestingController.verify();
  });

  it('getLeaderBoardByCatagoryId should return specific Leaderboard', () =>{
    const test = [{
      userName : "A",
      name: "some string",
      averageWPM : 50,
      averageAcc : 60,
      ranking : 4
    }]
      var expected = 1;
      service.getLeaderBoardByCatagoryId(expected).then(res =>{
        expect(res).toEqual(test);
      });
      const req = httpTestingController.expectOne(`${environment.dev.serverUrl}LB/api/Leaderboard/${expected}`);
      expect(req.request.method).toEqual("GET");
      req.flush(test);
      httpTestingController.verify();
  });

  it('getTestContentByCatagoryId should get', () =>{
    const test = {
      catagoryId: Language.ActionScript,
      content: "string",
      author: "string",
      length: 1
    }
      var expected = 1;
      service.getTestContentByCatagoryId(expected).then(res =>{
        expect(res).toEqual(test);
      });
      const req = httpTestingController.expectOne(`${environment.dev.serverUrl}typetest/api/TypeTest/${expected}`);
      expect(req.request.method).toEqual("GET");
      req.flush(test);
      httpTestingController.verify();
  });

  it('getCompetitions should get', () =>{
    const test = [{
      start: new Date(),
      end: new Date(),
      category: 1,
      name : "some string",
      snippet: "some string",
      author: "some string",
      compId: 1
    }]
      service.getCompetitions().then(res =>{
        expect(res).toEqual(test);
      });
      const req = httpTestingController.expectOne(`${environment.dev.serverUrl}competition/api/Competition`);
      expect(req.request.method).toEqual("GET");
      req.flush(test);
      httpTestingController.verify();
  });

  //get route doesn't work - will circle back
  // it('getCompetitionContent should get', () =>{
  //   const test = {
  //     id: 1,
  //     testString: "some string",
  //     author: "some string",
  //     categoryId : 1
  //   }
  //     var expected = 1;
  //     service.getCompetitionContent(expected).then(res =>{
  //       expect(res).toEqual(test);
  //     });

  //     const req = httpTestingController.expectOne(`${environment.dev.serverUrl}api/CompetitionStats/${expected}`);
  //     expect(req.request.method).toEqual("GET");
  //     req.flush(test);
  //     httpTestingController.verify();
  // });

  it('getloggedInUser should get', () =>{
    const test = {
      userName: "some string",
      name: "some string"
    }
    service.getloggedInUser().then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}typetest/api/User/username`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });

  it('getUserName should get', () =>{
    const test = {
      username: "some string",
      name: "some string",
      revapoints: 100,
      userId: 1
    }
    service.getUserName().then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}typetest/api/User/username`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });

  it('getCompetitionResults should get', () =>{
    const test = [{
      wpm: 1,
      rank: 1,
      userName: "some string",
      accuracy: 1,
      name: "some string",
      userId: 1
    }]
    var expected = 1;
    service.getCompetitionResults(expected).then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}competition/api/Competition/${expected}`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });



  it('testcallApi should get', () =>{
    const test = "some string"
    service.testcallApi().then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}api/test/CodeSnippet/Secret`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });

  it('testcallApiPublic should get', () =>{
    const test = "some string"
    service.testcallApiPublic().then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}api/test/CodeSnippet`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });

  it('testcallApiGetUserInfo should get', () =>{
    const test = "some string"
    service.testcallApiGetUserInfo().then(res =>{
      expect(res).toEqual(test);
    });
    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}api/test/Test/Secret`);
    expect(req.request.method).toEqual("GET");
    req.flush(test);
    httpTestingController.verify();
  });

  it('postTestResults should post', () =>{
    const test = {
      categoryId: 1,
      numberofcharacters : 1,
      numberoferrors: 1,
      wpm: 1,
      timetakenms : 1,
      date: new Date()
    }

    service.postTestResults(test);

    const req = httpTestingController.expectOne(`${environment.dev.serverUrl}typetest/api/TypeTest`);
    expect(req.request.method).toEqual("POST");
    req.flush(test);
    httpTestingController.verify();
  });

  // it('postCompetitionResults should post', () =>{
  //   const test = {
  //     categoryId: 1,
  //     numberofcharacters: 1,
  //     numberoferrors: 1,
  //     wpm: 1,
  //     timetakenms: 1,
  //     date: new Date(),
  //     compId: 1
  //   }

  //   service.postCompetitionResults(test);

  //   const req = httpTestingController.expectOne(`${environment.dev.serverUrl}competition/api/CompetitonStats`);
  //   expect(req.request.method).toEqual("POST");
  //   req.flush(test);
  //   httpTestingController.verify();
  // });

  // it('postCompetition should post', () =>{
  //   const test = {
  //     start : new Date(),
  //     end : new Date(),
  //     category: 1,
  //     name : "some string",
  //     snippet: "some string",
  //     author: "some string",
  //     compId: 1
  //   }

  //   service.postCompetition(test);

  //   const req = httpTestingController.expectOne(`${environment.dev.serverUrl}competition/api/Competition`);
  //   expect(req.request.method).toEqual("POST");
  //   req.flush(test);
  //   httpTestingController.verify();
  // });

});

  /* describe('#getUserStats', () =>{
    let expectedURL = `${environment.dev.serverUrl}api/UserStat/all`;
    let expectedStats: StatModel[] = [];
    /*const http = {
      get(url: string, headers: any): Promise<StatModel[]>{
        if(url === expectedURL){
          return expectedStats;
        }
        throw new Error();
      }
    } as HttpClient;*/
    /*it('getUserStats should return', () =>{
      service.getUserStats().then(value =>{
      expect(value).toBeTruthy();
    });/
    /*const serv = new RestService(http);
    const result = service.getUserStats();
    expect(result).toBeGreaterThan(0);
  });
  });*/


