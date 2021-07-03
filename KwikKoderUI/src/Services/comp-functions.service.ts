import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../Models/state';
import { RestService } from '../Services/rest.service';
import { of, Subscription } from 'rxjs';
import { CompetitionContent } from '../Models/CompetitionContentModel';
import { CompetitionTestResults } from '../Models/CompetitionTestResults';
import { ResultModel } from 'src/Models/ResultModel';
import { LiveCompService } from './live-comp.service';
import { Language } from 'src/Models/LanguageEnum';

@Injectable({
  providedIn: 'root'
})
export class CompFunctionsService {

  constructor(
    private api: RestService,
    public liveSer: LiveCompService,
  ) { }

  testmat: any = null;
  testStarted: boolean = false;
  state: State;
  timeTaken: number;
  wpm: number;
  expectSpace: boolean;
  skip: boolean;
  category: number = -1;
  categoryName: string = Language[this.category];
  sub: Subscription;
  compId: number;
  author: string;
  result : ResultModel;
  timer = {
    minutes: 1,
    seconds: 0
  };
  intervalId: any;
  timerFinished: boolean;

  resetTimer(): void {
    this.timer = {
      minutes: 1,
      seconds: 0
    };
  };
  
  newTest(): void{
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
    this.resetTimer();
    this.testStarted = false;
    
    this.expectSpace = false
    this.skip = false
    //get content to type
    console.log(this.category);
    this.api.getTestContentByCatagoryId(this.category).then(
      (obj)=> {
        this.testmat = obj;
        this.state.words = this.testmat.content;
        this.state.wordarray = this.state.words.split('');
        this.state.wordarray= this.state.wordarray.filter(this.checkIsBadChar);

        let lineIndicies = [];
        for(let i = 0; i < this.state.wordarray.length; i++) {
          if(this.state.wordarray[i] === "\n") lineIndicies.push(i);
        }
        //limit to 30 new line chars
        if(lineIndicies.length > 30) {
          let maxNum = lineIndicies.length - 30;
          let randomStart = this.getRandomInt(0, maxNum);
          this.state.wordarray = this.state.wordarray.slice(lineIndicies[randomStart] + 1, lineIndicies[randomStart + 30]);
        }
      })
  }

  focusInputArea(): void{
    document.getElementById("input-area").focus();
    this.ShowCaret();    
  }

  startRound(roomId): void {
    console.log('starting round...');
    let test:any = { 
      compId: roomId, 
      category: this.category, 
      testString: this.testmat.content, 
      testAuthor: this.testmat.author
    }; 
    this.liveSer.alertNewTest(roomId, test)
    // this.liveSer.emitStartTest();
  }

  startTest():void {
    console.log('starting test...');
    this.testStarted = true;
    this.startTimer();
  }

  ShowCaret(){
    if(document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement == null) return;
    (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.borderLeft = "solid 0.1em gold";
    (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.borderLeftColor = "yellow";
  }
  HideCaret(){
    (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.borderLeft = "transparent";
    (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.borderLeftColor = "transparent";
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pad(num: number) {
    if(num < 10) return `0${num}`;
    else return num;
  }

  checkIsBadChar(element: string, index: number, array: any) {
    if((element == "\r") || (element == "\t")){
      return false
    }else{
      return true
    }
  }

  calcWordsPerMinute (charsTyped: number, ms: number): number {
    return (charsTyped / 5) / (ms / 60000);
  }

  onWordChange(event: KeyboardEvent): void {
    if(this.state.finished) { return }
    let e = event.key
    if (!this.state.started) {
      this.state.started= true
      this.state.startTime = new Date()
      this.startTimer()
    }
    let expectedLetter = this.state.wordarray[this.state.letterPosition];

    
    if(e == "Enter"){
      e="\n"
    }

    if(e == expectedLetter){
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.opacity = "0.3";
      this.HideCaret();
      this.state.correctchars +=1;
      this.state.letterPosition+=1;
      this.ShowCaret();
    }
    else if(e == "Backspace"){
      //e="";
      this.HideCaret();
      this.state.letterPosition-=1; 
      this.ShowCaret();
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.opacity = "1.0";
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.backgroundColor = "#32302f";
    }
    else if(e == "Shift"){
    }
    else{
      this.HideCaret();
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).style.backgroundColor = "red";
      this.state.letterPosition+=1;
      this.ShowCaret();
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9-_ ]/.test(inp)){ this.state.errors+=1; }
    }


    if(this.checkIfFinished()){
      return;
    }
    if(this.state.wordarray[this.state.letterPosition]=="\n"){
      //display enter prompt
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).textContent = "⏎\n";
    }
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
    console.log('intercepting key strokes', event);
    //has the test started?
    if(!this.testStarted) return;
    else this.onWordChange(event);
  }

  checkIfFinished(): boolean {
    let numletters = this.state.wordarray.length-1
    const wpm = this.calcWordsPerMinute(this.state.correctchars, new Date().getTime() - this.state.startTime.getTime() )
    this.wpm = Math.floor(wpm);
    //check if words are done
    console.log('checking for doneness', this.state);
    if(this.state.letterPosition >= this.state.wordarray.length){
      console.log('tis done');
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
      this.timeTaken = timeMillis;
      console.log("#errors", this.state.errors);

      //stop timer and flip the flag
      clearInterval(this.intervalId);
      this.state.finished = true;
      //submit result to the server
      console.log("Test Complete Submitting Results", this.result);
      // this.submitResults();
      return true;

    }
    //did we run out of time instead?
    if(this.timerFinished){
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime();
      this.timeTaken = timeMillis;
      this.state.finished = true;
      // this.submitResults();
      return true;
    }
    console.log('finished??', this.state);
    return false;
  }
  observeIfCompFinished(){
    const isFinished = of(this.state.finished)
    return isFinished
  }

  startTimer() {
    this.resetTimer();
    this.intervalId = setInterval(() => {
      if (this.timer.seconds - 1 == -1) {
        this.timer.minutes -= 1;
        this.timer.seconds = 59;
      }
      else this.timer.seconds -= 1;
      if (this.timer.minutes === 0 && this.timer.seconds == 0) {
        this.timerFinished = true;
        clearInterval(this.intervalId);
        this.checkIfFinished();
      }
      }, 1000);
  }
  
}
