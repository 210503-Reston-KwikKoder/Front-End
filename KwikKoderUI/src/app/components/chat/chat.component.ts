import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() roomId
  @Input() userName
  newMessage: string;
  messageList: any = [];

  constructor(
    private chatService: ChatService,
  ) { }
  
  
  chatObserver: any;
  // this allows the chat to use spaces and sends the message if enter is pressed
  messageInputHandler(e){
    if(e.keyCode == 13){
      this.sendMessage()
    } else if(e.key === " "){
      this.newMessage += e.key
    }
  }

  // sends message when the send btn is pressed
  sendMessage(){
    if(this.newMessage && this.newMessage != "Robbie is cool"){
      this.chatService.sendMessage(this.newMessage, this.userName, this.roomId);
      this.newMessage = '';
    }
  }

  // subscribes to new messages from socket room
  SetMessageWatch(){
    this.chatObserver = this.chatService.getMessages().subscribe((messageAndName: any) => {
      this.messageList.push(messageAndName);
    })
  }

  ngOnInit(): void {
    // sets an observable to notify when there are new messages
    this.SetMessageWatch();
  }

  ngOnDestroy(): void {
    console.log('chat destroy, unsubscribing', this.chatObserver)
    this.chatObserver.unsubscribe();
  }

}
