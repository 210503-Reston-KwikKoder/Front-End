import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';;
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveCompService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  // returns link to new competition and competition Id as int in body
  public createNewLiveCompRoom(name: any){
    return this.http.post(
      `${env.dev.serverUrl}competition/api/LiveCompetition`,
      name
    ).toPromise()
  }

  // returns an array of { id: , name: } objects
  public getAllLiveCompRooms(){
    return this.http.get(`${env.dev.serverUrl}competition/api/LiveCompetition`).toPromise()
  }

  public subscribableCheckIfUserIsNext = () => {

  }

  public emitStartTest(){
    return this.socket.emit("start-round")
  }

  // put a test on the liveComp room
  // expects test as a { "compId": 0, "category": 0, "testString": "string", "testAuthor": "string" }
  public setNextLiveCompTest(test: any){
    return this.http.put(`${env.dev.serverUrl}competition/api/LiveCompetition/nexttest`, test).toPromise()
  }

  public listenForNewTest = () =>{
    return new Observable((observer) => {
      this.socket.on('new-test', ((test) => {
        console.log('listened to new test');
        observer.next(test);
      }))
    })
  }

  public alertNewTest(roomId, test){
    console.log('alerting new test', roomId, test)
    return this.socket.emit('new-test', roomId, test)
  }

  public getCurrentTest(roomId){
    return this.http.get(`${env.dev.serverUrl}/competition/api/LiveCompetion/latest/${roomId}`)
  }

  public listenForRoundStart = () => {
    return new Observable((observer) => {
            this.socket.on('round-start', (() => {
                observer.next();
            }));
    });
  }


}
