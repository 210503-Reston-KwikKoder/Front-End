import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/Services/chat.service';
import { RestService } from 'src/Services/rest.service';
import { Usermodel } from 'src/Models/UserModel';
import { TestModel } from 'src/Models/TestModel';
import { State } from 'src/Models/state';
import { TestMaterial } from 'src/Models/TestMaterial';
import { ResultModel } from 'src/Models/ResultModel';

import { Language } from 'src/Models/LanguageEnum';
import { unwatchFile } from 'fs';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit {
  roomId: any
  newMessage: string;
  messageList:  string[] = [];

  constructor(
    private chatService: ChatService, 
    private restService: RestService,
    private route: ActivatedRoute,
    ) {
      console.log(this.route.snapshot.paramMap.get('compId'))
      this.roomId = this.route.snapshot.paramMap.get('compId')
     }

  // need ot decide how to set the room id 
  // this will put people in the same room
  joinSocketRoom(){
    console.log(this.roomId)
    this.chatService.joinSocketRoom(this.roomId)
  }

  log(e){
    console.log(e)
    console.log(this.newMessage)
  }

  messageInputHandler(e){
    if(e.keyCode == 13){
      this.sendMessage()
    }else if(e.key === " "){
      this.newMessage += e.key
    }
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

  onWordChange(event: KeyboardEvent): void {
    if(this.state.finished){
      return
    }
    let e = event.key
    if (!this.state.started) {
      this.state.started= true
      this.state.startTime = new Date()
      this.startTimer();
    }
    let expectedLetter = this.state.wordarray[this.state.letterPosition]

    if(e == "Enter"){
      e="\n"
    }

    if(e == expectedLetter){
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.backgroundColor = "green";
      this.state.correctchars +=1;
      this.state.letterPosition+=1;    
    }else{
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.backgroundColor = "red";
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9-_ ]/.test(inp)){
        this.state.errors+=1;
      }
    }
  
    if(this.checkIfFinished()){
      return
    }
    if(this.state.wordarray[this.state.letterPosition]=="\n"){
      //display enter prompt
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).textContent = "⏎\n";
    }    
    (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.backgroundColor = "blue";
  }

  startTimer() {
    this.minutes = 1
    this.seconds = 0 // choose whatever you want
    let intervalId = setInterval(() => {
      if (this.seconds - 1 == -1) {
        this.minutes -= 1;
        this.seconds = 59;
      }
      else this.seconds -= 1;
      if (this.minutes === 0 && this.seconds == 0) {
        this.timerFinished = true;
        clearInterval(intervalId);
        this.checkIfFinished();
      }
      }, 1000);
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
      this.onWordChange(event)

  } 

  //RestService and TestComputing

  isBadChar(element: string, index: number, array: any) {
    if((element == "\r") || (element == "\t")){
      return false;
    }else{
      return true;
    }
  } 

  checkIfFinished(): boolean {
    
    let numletters = this.state.wordarray.length-1   

    const wpm = this.wordsPerMinute(this.state.correctchars, new Date().getTime() - this.state.startTime.getTime() )
    this.wpm = Math.floor(wpm);

    //check if words are done
    if(this.state.letterPosition >= this.state.wordarray.length){ 
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
      this.timeTaken = timeMillis;     
      console.log("#errors", this.state.errors)
      this.state.finished = true;
      this.submitResults()
      return true
    
    }
    if(this.timerFinished){
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
      this.timeTaken = timeMillis;     
      console.log("#errors", this.state.errors)
      this.state.finished = true;
      this.submitResults()
      return true
    }

    return false;
  }

  testmat: TestMaterial = {author: '', content: '', length: 0,catagoryId: 0};

  state: State;
  timeTaken: number;
  wpm: number;
  expectSpace: boolean;
  skip: boolean;
  category: number;
  categoryName: string;
  timerFinished: boolean;
  seconds: number = 0;
  minutes: number = 0;
  result : ResultModel;

  newTest(){
    let id : number = this.category
    this.categoryName = Language[id]
    this.timerFinished = false;
    this.seconds = 0;
    this.minutes = 1;
    this.wpm = 0;
    this.state = {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      //wordPosition: 0,
      finished: false,
      correctchars: 0
    }
    this.expectSpace = false
    this.skip = false
    //get content to type
    this.restService.getTestContentByCatagoryId(id).then(
      (obj)=> {
        this.testmat = obj;
        //this.testmat.content= obj.content;
        //this.testmat.author = obj.author;
        this.state.words = this.testmat.content;
        this.state.wordarray = this.state.words.split('');
        this.state.wordarray= this.state.wordarray.filter(this.isBadChar);

        let lines = 0;
        //limit to 500 new line chars
        for (let index = 0; index < this.state.wordarray.length; index++) {
          const element = this.state.wordarray[index];
          if(element == "\n"){
            lines++;
          }
          if(lines > 500){
            this.state.wordarray = this.state.wordarray.slice(0, index);
          }
        }  
      })
    //TO DO: implement pulling up a new snippet after 2 users finish test
  }
  
  wordsPerMinute (charsTyped: number, ms: number): number {
    return ((charsTyped / 5) / (ms / 60000))
  }  

  submitResults(){
  }

  ngOnInit(): void {
    this.joinSocketRoom()
    this.SetMessageWatch()
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") {
          e.preventDefault();
      }
    }, false);
  }

}
