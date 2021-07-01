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
    return this.http.put(`${env.dev.serverUrl}api/LiveCompetition/${roomId}/LCQ`, roomId).toPromise()
  }

  // nothing returned
  removeUserFromQueue(roomId, userId){
    return this.http.delete(`${env.dev.serverUrl}api/LiveCompetition/${roomId}/LCQ/${userId}`).toPromise()
  }

  // returns an ordered array of user objects
  getQueueUserNames(roomId){
    return this.http.get(`${env.dev.serverUrl}api/LiveCompetition/${roomId}/LCQ`).toPromise()
  }

  // returns the next user object
  getnextInLine(roomId){
    return this.http.delete(`${env.dev.serverUrl}api/LiveCompetition/${roomId}/LCQ/NextUser` ).toPromise()
  }

  alertQueueChangeToSocket(roomId){
    return this.socket.emit('updated-que', roomId);
  }

  public listenForQueueUpdates = () => {
    return new Observable((observer) => {
            this.socket.on('updated-que', (() => {
                observer.next();
            }));
    });
  }
}
