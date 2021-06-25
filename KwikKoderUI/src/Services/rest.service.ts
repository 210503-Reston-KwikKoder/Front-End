import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { TestModel } from 'src/Models/TestModel';
import { LBModel } from 'src/Models/LBModel';
import { TestMaterial } from 'src/Models/TestMaterial';
import { CompModel } from 'src/Models/CompModel';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';
import { Usermodel } from 'src/Models/UserModel';
import { UserNameModel } from 'src/Models/UserNameModel';
import { StatModel } from 'src/Models/StatModel';
import { CompStatModel } from 'src/Models/CompStatModel';
import { ProgressGraphData } from 'src/Models/ProgressGraphData';
import { BetInputModel } from 'src/Models/BetInputModel';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  testcallApi(): Promise<string> {    
    return this.http.get(`${env.dev.serverUrl}api/test/CodeSnippet/Secret`, {responseType: 'text'}).toPromise(); 
  }

  testcallApiPublic(): Promise<string> {
    return this.http.get(`${env.dev.serverUrl}api/test/CodeSnippet`, {responseType: 'text'}).toPromise();      
  }

  testcallApiGetUserInfo(): Promise<string> {
    return this.http.get(`${env.dev.serverUrl}api/test/Test/Secret`, {responseType: 'text'}).toPromise()      
  }

  //production api calls:
  getLeaderBoardByCatagoryId(id: number): Promise<LBModel[]>{
    if(id == 0){
      return this.http.get<LBModel[]>(`${env.dev.serverUrl}api/LB`).toPromise(); 
    }else{
      return this.http.get<LBModel[]>(`${env.dev.serverUrl}api/LB/${id}`).toPromise(); 
    }
  }

  getTestContentByCatagoryId(id: number): Promise<TestMaterial>{
    return this.http.get<TestMaterial>(`${env.dev.serverUrl}api/TypeTest/${id}`).toPromise();
  }
  getCompetitions(): Promise<CompModel[]>{
    return this.http.get<CompModel[]>(`${env.dev.serverUrl}api/Competition`).toPromise();
  }

  postTestResults(test: TestModel){
    let status = this.http.post(`${env.dev.serverUrl}api/TypeTest`, test);
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    )
    //console.log("status code:", status);
  }

  postCompetitionResults(test: CompetitionTestResults){
    let status =  this.http.post(`${env.dev.serverUrl}api/CompetitonStats`, test)
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    ) 
  }
  postCompetition(comp: CompModel): number{

    let status = this.http.post(`${env.dev.serverUrl}api/Competition`, comp);
    status.subscribe(
      (id) => {return id}
    );
    return null;
  }
  getCompetitionContent(id: number):Promise<CompetitionContent>{
    return this.http.get<CompetitionContent>(`${env.dev.serverUrl}/api/CompetitonStats/${id}`).toPromise();    
  }
  getloggedInUser():Promise<UserNameModel>{
    return this.http.get<UserNameModel>(`${env.dev.serverUrl}api/User/username`).toPromise();
  }
  getUserStats(): Promise<StatModel[]>{
    return this.http.get<StatModel[]>(`${env.dev.serverUrl}api/UserStat/all`).toPromise();
  }
  getUserName(): Promise<Usermodel>{
    return this.http.get<Usermodel>(`${env.dev.serverUrl}api/User/username`).toPromise();
  }
  getCompetitionResults(id: number): Promise<CompStatModel[]>{
    return this.http.get<CompStatModel[]>(`${env.dev.serverUrl}api/Competition/${id}`).toPromise();    
  }
  getProgressResults(): Promise<ProgressGraphData[]>{
    //To Do: modify API call when backend has added functionality for multipl;
    return this.http.get<ProgressGraphData[]>(`${env.dev.serverUrl}api/UserStat/tests`).toPromise();
  }
  putBet(bet : BetInputModel):void{
    let status =  this.http.put(`${env.dev.serverUrl}api/Competition/bet`, bet)
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    ) 
  }
  ClaimBets(id: number):void{
    let status =  this.http.put(`${env.dev.serverUrl}api/Competition/bet/${id}`,id)
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    ) 
  }
}
