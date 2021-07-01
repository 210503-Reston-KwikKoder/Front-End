import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveCompService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }


  public subscribableCheckIfUserIsNext = () => {
    return new Observable((observer) => {
        this.socket.on('new-challenger', ((challengerId: any) => {
            observer.next(challengerId)
        }))
    })
  }
  
  public alertNextChallenger(challengerId){
    return this.socket.emit('new-challenger', challengerId)
  }
}
