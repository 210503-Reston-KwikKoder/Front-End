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

});
