import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  // nothing returned
  addUserToQueue(roomId){
    return this.http.put(`${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/${roomId}`, roomId).toPromise()
  }

  // nothing returned
  removeUserFromQueue(roomId){
    return this.http.delete(`${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/${roomId}`).toPromise()
  }

  // returns an ordered array of user objects
  getQueueUserNames(roomId){
    return this.http.get(`${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/${roomId}`).toPromise()
  }

  // returns the next user object
  getnextInLine(roomId){
    return this.http.delete(`${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/${roomId}/LCQ/NextUser` ).toPromise()
  }

  //alerts when someone joins of leaves socket
  alertQueueChangeToSocket(roomId){
    return this.socket.emit('updated-que', roomId);
  }
  //receives message of entering or leaving socket.
  public listenForQueueUpdates = () => {
    return new Observable((observer) => {
            this.socket.on('updated-que', (() => {
                observer.next();
            }));
    });
  }
}
