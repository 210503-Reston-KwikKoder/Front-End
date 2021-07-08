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

  public leaveSocketRoom(id: any) {
    this.socket.emit('leave-comp-room', id)
  }

  public sendMessage(message: any, senderName: any, roomId: any) {
    console.log("service is emiting new message: "+message, "with roomId"+roomId, "with senderName: "+senderName)
    this.socket.emit('new-message', message, senderName, roomId);
  }

  public getMessages = () => {
    return new Observable((observer) => {
            this.socket.on('new-message', ((message: any, senderName: any) => {
              console.log("message recived: "+message, senderName)
                let messageAndName = {
                  message: message,
                  senderName: senderName
                }
                observer.next(messageAndName);
            }));
    });
  }
}
