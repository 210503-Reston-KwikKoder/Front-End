import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/Services/chat.service';
import { RestService } from 'src/Services/rest.service';
import { CompFunctionsService } from 'src/Services/comp-functions.service';
import { QueService } from 'src/Services/que.service';
import { LiveCompService } from 'src/Services/live-comp.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit, OnDestroy{
  roomId: any
  newMessage: string;
  messageList:  string[] = [];
  currentUserId: any;
  currentUserName: any
  currentChallenger: any

  constructor(
    private chatService: ChatService, 
    private restService: RestService,
    private route: ActivatedRoute,
    private comp: CompFunctionsService,
    private queue: QueService,
    private liveComp: LiveCompService,
    public auth: AuthService
    ) {
      this.roomId = this.route.snapshot.paramMap.get('compId')
    }

  // enters the user into the correct room in the socket
  joinSocketRoom(){
    this.chatService.joinSocketRoom(this.roomId)
  }

  // this allows the chat to use spaces and sends the message if enter is pressed
  messageInputHandler(e){
    if(e.keyCode == 13){
      this.sendMessage()
    }else if(e.key === " "){
      this.newMessage += e.key
    }
  }

  // sends message when the send btn is pressed
  sendMessage(){
    this.chatService.sendMessage(this.newMessage, this.roomId);
    this.newMessage = '';
  }

  // subscribes to new messages from socket room
  SetMessageWatch(){
    this.chatService
    .getMessages()
    .subscribe((message: any) => {
      this.messageList.push(message);
    })
  }

  // subscribes to the next challenger event and checks if user is the next challenger
  setNextChallengerWatch(){
    this.liveComp.subscribableCheckIfUserIsNext().subscribe(challengerId => {
      if(challengerId == this.currentUserId){
        this.currentChallenger = true
      }
    })
  }

  addToQueue(){
    //TO DO: add users to queue to be placed in competition
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
    if (event){
      this.comp.onWordChange(event)
    } else {
      console.log("check event: " + event);
    }
  }

  focusInputArea(): void{
    document.getElementById("input-area").focus();
  }

  ngOnInit(): void {
    // enters user into the socket room
    this.joinSocketRoom();
    // sets the user Id
    this.auth.user$.subscribe((profile) => {
      this.currentUserId = profile.sub;

      console.log(profile);
    })
    // sets an observable to notify when there are new messages
    this.SetMessageWatch();
    // sets an observabel to notify when the user is entered into the competion



    this.comp.newTest();

    // prevents page scroll when hitting the spacebar
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") {
          e.preventDefault();
      }
    }, false);
  }


  // if the user leaves the room they are removed from the que 
  ngOnDestroy(){
    this.queue.removeUserFromQueue(this.roomId)
    .catch(err => console.log(err))
  }

}
