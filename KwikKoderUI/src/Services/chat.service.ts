import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private socket: Socket) { }

  public joinSocketRoom(id: any){
    this.socket.emit('join-comp-room', id)
  }

  public sendMessage(message: any, id: any) {
    console.log("service is emiting new message: "+message, "with roomId"+id)
    this.socket.emit('new-message', message, id);
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
