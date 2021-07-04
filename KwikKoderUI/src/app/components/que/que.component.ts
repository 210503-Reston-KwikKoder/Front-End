import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { QueService } from 'src/Services/que.service';

@Component({
  selector: 'app-que',
  templateUrl: './que.component.html',
  styleUrls: ['./que.component.css']
})
export class QueComponent implements OnInit {
  
  public orderedUsersInQueue: any
  @Input() roomId
  currentWinner: any;
  currentChallenger: any;
  @Output() alertNewWinnerAndChallenger = new EventEmitter<any>();

  constructor(
    private queue: QueService
  ) { }

  // gets and ordered list of [ { "userId” : 0, “userName”: “string”, “name”: “string”, “enterTime”: "2021-06-18T02:21:56.857Z" } ]
  //  in the queue and sets it to the local variable orderedNamesInQueue
  getQueParticipants(){
    console.log('getting the queue');
    this.queue.getQueueUserNames(this.roomId)
    .then(users => {
      console.log(users)
      this.orderedUsersInQueue = users
      this.currentWinner = this.orderedUsersInQueue[0]
      this.currentChallenger = this.orderedUsersInQueue[1]
      this.alertNewWinnerAndChallenger.emit({
          winner: this.currentWinner,
          challenger: this.currentChallenger
      })
    })
    .catch(err => console.log(err))
  }

  // triggers from join btn; adds a user the the que in the db, then alerts the socket to check for changes
  addUserToQueue(){
    console.log('addingUserToQueue', this);
    this.queue.addUserToQueue(this.roomId)
      .then(() => {
        console.log('added user, now calling queue change');
        this.queue.alertQueueChangeToSocket(this.roomId);
      }) 
      .catch((err) => console.log(err))
  }

  // listens on the socket for when the queue changes in the db and calls the getQueParticipants func
  setListenForQueueUpdates(){
    this.queue
    .listenForQueueUpdates()
    .subscribe(() => {
      console.log("heard that the queue has updated")
      this.getQueParticipants()
    })
  }

  ngOnInit(): void {
    this.setListenForQueueUpdates()
    this.getQueParticipants()
  }

}
