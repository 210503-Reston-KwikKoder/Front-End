import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompModel } from 'src/Models/CompModel';
import { CreateCompetitionComponent } from './create-competition.component';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { RestService } from 'src/Services/rest.service';
import { UserNameModel } from 'src/Models/UserNameModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LangSelectComponent } from 'src/app/components/lang-select/lang-select.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayDatePipe } from '../../pipes/display-date.pipe';
import { Router } from '@angular/router';

describe('CreateCompetitionComponent', () => {
  let component: CreateCompetitionComponent;
  let fixture: ComponentFixture<CreateCompetitionComponent>;
  let newComp: CompModel;

  class MockAuthService{

  }
  class MockSnackBar{

  }
  @Pipe({name: 'displayDate'})
  class MockPipe implements PipeTransform {
      transform(value: number): number {
          //Do stuff here, if you want
          return value;
      }
    }

  class MockRestService
  {
    getTestContentByCatagoryId(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
    getloggedInUser(){};
    postCompetition(){};

  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ CreateCompetitionComponent ],
      providers: [
        {provide: SnackBarComponent, useClass: MockSnackBar},
        {provide: RestService, useClass: MockRestService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: DatePipe, useClass: MockPipe},
      ],
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date set',()=>{
    expect(component.realStartDate).toBeTruthy();
  });

  it('should get new snippet', ()=>{
    let spy = spyOn(component, 'newSnippet')
    component.langSelected(-1)
    expect(spy).toHaveBeenCalled()
  });

  // it('should call thing', ()=>{
  //  let ser = TestBed.inject(RestService)
  //  let spy = spyOn(ser, 'postCompetition')
  //  component.CreateCompetition();
  //   expect(spy).toHaveBeenCalledTimes(0)
  // });


  // test comp model creation
  // it('should create model', () => {
  //   expect(newComp).toBeTruthy();
  // })
  //newComp properties should be set properly

  // it('should get new snippet', ()=>{
  //   let spy = spyOn(component, 'newSnippet')
  //   component.langSelected(-1)
  //   expect(spy).toHaveBeenCalled()
  // });

});
