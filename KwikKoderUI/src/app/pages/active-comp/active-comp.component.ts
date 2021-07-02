import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/Services/chat.service';
import { RestService } from 'src/Services/rest.service';
import { CompFunctionsService } from 'src/Services/comp-functions.service';
import { QueService } from 'src/Services/que.service';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit, OnDestroy{
  roomId: any
  newMessage: string;
  messageList:  string[] = [];

  constructor(
    private chatService: ChatService,
    private restService: RestService,
    private route: ActivatedRoute,
    private comp: CompFunctionsService,
    private queue: QueService
    ) {
      this.roomId = this.route.snapshot.paramMap.get('compId')
    }

  joinSocketRoom(){
    console.log(this.roomId)
    this.chatService.joinSocketRoom(this.roomId)
  }

  log(e){
    //console.log(e)
    //console.log(this.newMessage)
  }

  messageInputHandler(e){
    if(e.keyCode == 13) this.sendMessage();
    else if(e.key === " ") this.newMessage += e.key
  }

  sendMessage(){
    this.chatService.sendMessage(this.newMessage, this.roomId);
    this.newMessage = '';
  }

  SetMessageWatch(){
    this.chatService
    .getMessages()
    .subscribe((message: any) => {
      this.messageList.push(message);
    });
  }


  addToQueue(){
    //TO DO: add users to queue to be placed in competition
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
    if (event) this.comp.onWordChange(event)
  }

  focusInputArea(): void{
    document.getElementById("input-area").focus()
  }

  ngOnInit(): void {
    this.joinSocketRoom()
    this.SetMessageWatch()
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") e.preventDefault();}, false);
  }

  // if the user leaves the room they are removed from the que
  ngOnDestroy(){
    this.queue.removeUserFromQueue(this.roomId).catch(err => console.log(err))
  }

}
