import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { TestModel } from 'src/Models/TestModel';
import { LBModel } from 'src/Models/LBModel';
import { TestMaterial } from 'src/Models/TestMaterialModel';
import { CompModel } from 'src/Models/CompModel';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResultsModel';
import { Usermodel } from 'src/Models/UserModel';
import { UserNameModel } from 'src/Models/UserNameModel';
import { StatModel } from 'src/Models/StatModel';
import { CompStatModel } from 'src/Models/CompStatModel';
import { ProgressGraphData } from 'src/Models/ProgressGraphDataModel';

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
      return this.http.get<LBModel[]>(`${env.dev.serverUrl}LB/api/Leaderboard`).toPromise(); 
    }else{
      return this.http.get<LBModel[]>(`${env.dev.serverUrl}LB/api/Leaderboard/${id}`).toPromise(); 
    }
  }

  getTestContentByCatagoryId(id: number): Promise<TestMaterial>{
    return this.http.get<TestMaterial>(`${env.dev.serverUrl}typetest/api/TypeTest/${id}`).toPromise();
  }
  getCompetitions(): Promise<CompModel[]>{
    return this.http.get<CompModel[]>(`${env.dev.serverUrl}competition/api/Competition`).toPromise();
  }

  postTestResults(test: TestModel){
    let status = this.http.post(`${env.dev.serverUrl}typetest/api/TypeTest`, test);
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    )
  }

  postCompetitionResults(test: CompetitionTestResults){
    let status =  this.http.post(`${env.dev.serverUrl}competition/api/CompetitonTests`, test)
    status.subscribe(
      (code) => {console.log("status code:", code);} 
    ) 
  }
  postCompetition(comp: CompModel): number{

    let status = this.http.post(`${env.dev.serverUrl}competition/api/Competition`, comp);
    status.subscribe(
      (id) => {return id}
    );
    return null;
  }
  // possible bug generation
  getCompetitionContent(id: number):Promise<CompetitionContent>{
    return this.http.get<CompetitionContent>(`${env.dev.serverUrl}competition/api/CompetitonTests/${id}`).toPromise();    
  }
  getloggedInUser():Promise<UserNameModel>{
    return this.http.get<UserNameModel>(`${env.dev.serverUrl}typetest/api/User/username`).toPromise();
  }
  getUserStats(): Promise<StatModel[]>{
    return this.http.get<StatModel[]>(`${env.dev.serverUrl}typetest/api/UserStat/all`).toPromise();
  }
  getOverallStats(): Promise<StatModel>{
    return this.http.get<StatModel>(`${env.dev.serverUrl}typetest/api/UserStat`).toPromise();
  }
  getUserName(): Promise<Usermodel>{
    return this.http.get<Usermodel>(`${env.dev.serverUrl}typetest/api/User/username`).toPromise();
  }
  getCompetitionResults(id: number): Promise<CompStatModel[]>{
    return this.http.get<CompStatModel[]>(`${env.dev.serverUrl}competition/api/Competition/${id}`).toPromise();    
  }
  getProgressResults(): Promise<ProgressGraphData[][]>{
    return this.http.get<ProgressGraphData[][]>(`${env.dev.serverUrl}typetest/api/UserStat/tests/all`).toPromise();
  }
}
