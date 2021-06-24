import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/Services/chat.service';
import { RestService } from 'src/Services/rest.service';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit {

  newMessage?: any;
  messageList:  string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage(){
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  SetMessageWatch(){
    this.chatService
    .getMessages()
    .subscribe((message: any) => {
      this.messageList.push(message);
    });
  }

  newTest(){
    //TO DO: implement pulling up a new snippet after 2 users finish test
  }

  addToQueue(){
    //TO DO: add users to queue to be placed in competition
  }

  ngOnInit(): void {
    this.SetMessageWatch()
  }

}
