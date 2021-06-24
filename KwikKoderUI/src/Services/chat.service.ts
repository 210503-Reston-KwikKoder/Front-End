import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private socket: Socket) { }

  public joinSocketRoom(id: any){
    this.socket.emit('join-comp-room')
  }

  public sendMessage(message: any, id: any) {
    console.log("service is emiting new message: "+message)
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
            this.socket.on('new-message', ((message: any) => {
              console.log("message recived: "+message)
                observer.next(message);
            }));
    });
  }
}
