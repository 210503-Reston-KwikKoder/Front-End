import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';;
import { observable, Observable } from 'rxjs';
import { State } from 'src/Models/StateModel';
import { ThisReceiver } from '@angular/compiler';

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

  // put a test on the liveComp room
  // expects test as a { "compId": 0, "category": 0, "testString": "string", "testAuthor": "string" }
  public setNextLiveCompTest(test: any){
    return this.http.put(`${env.dev.serverUrl}competition/api/LiveCompetition/nexttest`, test).toPromise()
  }

  //listens for new tests from socket
  public listenForNewTest = () =>{
    return new Observable((observer) => {
      this.socket.on('new-test', ((test) => {
        console.log('heard new test', test);
        observer.next(test);
      }))
    })
  }

  //sends the test material across the socket
  public alertNewTest(test){
    console.log('alerting new test');
    return this.socket.emit('new-test', test.compId, test)
  }

  public alertReset(roomId){
    console.log('alerting reset', roomId)
    return this.socket.emit('reset-test', roomId)
  }
  public listenForReset(){
    console.log('live serv listen for reset');
    return new Observable((observer) => {
      this.socket.on('reset-test', (() => {
        console.log('heard resetting test');
        observer.next();
      }))
    })
  }

  // does not get used YET (ever)
  public getCurrentTest(roomId){
    return this.http.get(`${env.dev.serverUrl}competition/api/LiveCompetion/latest/${roomId}`)
  }

  public sendCompetitionProgress(userState: any){
    // console.log('emitting comp-progress userState: ', userState);
    return this.socket.emit('comp-progress', userState)
  }

  public sendRoundWinner(roomId, winnerName){
    console.log('live comp service emitting winner-found');
    return this.socket.emit('winner-found', roomId, winnerName)
  }

  public listenForRoundWinner = () => {
    return new Observable((observer) => {
      this.socket.on('winner-found', (winnerName) => {
        console.log('winner-found heard by live service')
        observer.next(winnerName)
      })
    })
  }

  public connectToService = () => {
    console.log('connecting');
    return this.socket.connect();
  }

  public disconnectFromService = () => {
    console.log('disconnecting');
    return this.socket.disconnect();
  }

  public listenForCompProgress = () => {
    return new Observable((observer) => {
      this.socket.on('comp-progress', (userState) => {
        // console.log('listened to comp-progress', userState);
        observer.next(userState)
      })
    })
  }

  // used to emit when a competitor hits a key
  public emitKeyPress(key, roomId, competitorId){
    return this.socket.emit('comp-key', key, roomId, competitorId)
  }

  // returns an observable that triggers when a copetitor hits a key
  // provides subscriber with {letter: letter, competitorId: competitorId}
  public listenForCompKeyPress = () => {
    return new Observable((observer) => {
      this.socket.on('comp-key', (letter, competitorId) => {
        let letterAndCompetitorId = {
          letter: letter,
          competitorId: competitorId
        }
        observer.next(letterAndCompetitorId)
      })
    })
  }

  public sendRoundResults(roomId, results){
    console.log('round result sending', roomId, results)
    return this.http.put(`${env.dev.serverUrl}competition/api/LiveCompetition/LCS/${roomId}`, results).toPromise();
  }
}
