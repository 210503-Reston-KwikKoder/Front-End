import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompModel } from 'src/Models/CompModel';
import { RestService } from 'src/Services/rest.service';

import { ViewCompetitionsComponent } from './view-competitions.component';

describe('ViewCompetitionsComponent', () => {
  let component: ViewCompetitionsComponent;
  let fixture: ComponentFixture<ViewCompetitionsComponent>;
  let rest: RestService;

  class MockRestService
  {
    getCompetitions(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
    //put api calls here if you want to test them
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompetitionsComponent ],
      providers: [
        {provide: RestService, useClass: MockRestService}
      ]
    })
    .compileComponents();
    rest = TestBed.inject(RestService)

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call GetCompetitions', () => {
    fixture = TestBed.createComponent(ViewCompetitionsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.GetCompetitions()).toHaveBeenCalled;
    expect(component.CompModels).not.toBeNull();
  });

  it('GetCompetitions should call', () => {
    fixture = TestBed.createComponent(ViewCompetitionsComponent);
    component = fixture.componentInstance;
    component.GetCompetitions();
    expect(rest.getCompetitions()).toHaveBeenCalled;
    expect(component.CompModels).not.toBeNull();
  });

  it('CompModels should filter', () => {
    fixture = TestBed.createComponent(ViewCompetitionsComponent);
    component = fixture.componentInstance;
    component.CompModels = [{
      start : new Date(),
      end : new Date(),
      category: 1,
      name : "string",
      snippet: 'string',
      author: 'string',
      compId: 1
    }];
    component.CurrentCompModels = component.CompModels.filter(
      (CompModel)=>
      {
        var now  = new Date()
        var endDate = new Date(CompModel.end)
        endDate.setMinutes(endDate.getMinutes()+10 - endDate.getTimezoneOffset())
        if(endDate < now){
          return  false;
        }

        //Dont display competitions that havent started
        var startDate = new Date(CompModel.start)
        startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())
        if(startDate > now){
          return  false;
        }
        return true
      });
    expect(component.CompModels).not.toEqual(component.CurrentCompModels);
  });

});
