import { Component, Input, OnInit } from '@angular/core';
import { QueService } from 'src/Services/que.service';

@Component({
  selector: 'app-que',
  templateUrl: './que.component.html',
  styleUrls: ['./que.component.css']
})
export class QueComponent implements OnInit {
  
  public orderedNamesInQueue: any
  @Input() roomId

  constructor(
    private queue: QueService
  ) { }

  // gets and ordered list of usernames in the queue and sets it to the local variable orderedNamesInQueue
  getQueParticipants(){
    this.queue.getQueueUserNames(this.roomId)
    .then(usersNames => {
      this.orderedNamesInQueue = usersNames
    })
    .catch(err => console.log(err))
  }

  // triggers from join btn; adds a user the the que in the db, then alerts the socket to check for changes
  addUserToQueue(){
    this.queue.addUserToQueue(this.roomId)
      .then(() => this.queue.alertQueueChangeToSocket)
      .catch((err) => console.log(err))
  }

  // listens on the socket for when the queue changes in the db and calls the getQueParticipants func
  setListenForQueueUpadtes(){
    this.queue
    .listenForQueueUpdates()
    .subscribe(() => this.getQueParticipants())
  }

  ngOnInit(): void {
  }

}
