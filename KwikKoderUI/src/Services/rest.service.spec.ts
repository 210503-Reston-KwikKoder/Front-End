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

describe('RestService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RestService;
  let httpMock : HttpTestingController;

  class MockService {
    testcallApi() {}
    testcallApiPublic() {}
    testcallApiGetUserInfo() {}
    getLeaderBoardByCatagoryId(id: number) {}
    getTestContentByCatagoryId(id: number) {}
    getCompetitions() {}
    postTestResults(test: TestModel) {}
    postCompetitionResults(test: CompetitionTestResults) {}
    postCompetition(comp: CompModel) {}
    getCompetitionContent(id: number):Promise<any>{
      return new Promise<any>((resolve, reject) => {})
    };
    getloggedInUser() {}
    getUserStats() {}
    getUserName() {}
    getCompetitionResults(id: number) {}
    getProgressResults() {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService]
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

    it('getUserStats should return', () =>{
      const userStats = [{username : "A",
        userID: "1",
        averagewpm! : 50,
        averageaccuracy! : 60,
        numberoftests! : 4,
        totaltesttime! : 12,
        category: 0}]

        service.getUserStats().then(res =>{
          expect(res).toEqual(userStats)
        });
        const req = httpTestingController.expectOne(`${environment.dev.serverUrl}api/UserStat/all`);
        expect(req.request.method).toEqual("GET");
        req.flush(userStats);
        httpTestingController.verify();
    });

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


