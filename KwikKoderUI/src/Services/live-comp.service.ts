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
    return new Observable((observer) => {
        this.socket.on('new-challenger', ((challengerId: any, winnerName: any) => {
            let challengerAndWinner = {
              challengerId: challengerId,
              winnerName: winnerName
            }
            observer.next(challengerAndWinner)
        }))
    })
  }

  public subscibableNewChallengeName = () => {
    return new Observable((observer) => {
      this.socket.on('challenge-accepted', ((challengerName: any) => {
        observer.next(challengerName)
      }))
    })
  }
  
  public alertNextChallenger(challengerId){
    return this.socket.emit('new-challenger', challengerId)
  }
}
