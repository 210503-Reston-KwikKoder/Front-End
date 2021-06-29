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

  addUserToQueue(roomId){
    return this.http.post(`${env.dev.serverUrl}api/TypeTest`, roomId).toPromise()
  }

  removeUserFromQueue(roomId){
    return this.http.delete(`${env.dev.serverUrl}api/`, roomId).toPromise()
  }

  getQueueUserNames(roomId){
    return this.http.get(`${env.dev.serverUrl}api/`).toPromise()
  }

  getnextInLine(roomId){
    return this.http.get(`${env.dev.serverUrl}`)
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
