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
import { Statement } from '@angular/compiler';

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
  challengerState: State;
  winnerState: State;
  timeTaken: number;
  challengerWpm: number;
  winnerWpm: number;
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

  resetState(): State {
    return {
      words: '',
      wordarray: new Array(),
      typedarray: new Array(),
      enteredText: '',
      errors: 0,
      started: false,
      startTime: null,
      timeTaken: 0,
      letterPosition: 0,
      finished: false,
      correctchars: 0
    };
  }
  
  newTest(): void{
    this.winnerWpm = 0;
    this.challengerWpm = 0;
    this.testmat = undefined;
    this.challengerState = this.resetState();
    this.winnerState = this.resetState();
    this.resetTimer();
    this.testStarted = false;
    
    this.expectSpace = false
    this.skip = false

    //get content to type
    this.api.getTestContentByCatagoryId(this.category).then(
      (obj)=> {
        if(obj) {
          this.testmat = obj;
          this.testmat.snippet = this.randomSnippet(obj.content, 10);
          console.log(this.testmat);
        }
      })

  }

  //challenger presses start round btn to trigger this function
  //takes room id and generated test material and emits it across the socket
  startRound(roomId): void {
    let test:any = { 
      compId: roomId, 
      category: this.category,
      categoryName: Language[this.category],
      testString: this.testmat.snippet, 
      testAuthor: this.testmat.author
    };
    console.log('starting round', test)
    this.liveSer.alertNewTest(test);
  }

  startTest():void {
    console.log('starting test...');
    const testStartTime = new Date();
    this.testStarted = true;
    this.winnerState.started = true;
    this.challengerState.started = true;
    this.winnerState.startTime = testStartTime;
    this.challengerState.startTime = testStartTime;
    this.startTimer();
  }

  //formats the test to be able to be typed
  formatTest(test: any, state: State): State {
    state.words = test.testString;
    state.wordarray = state.words.split('');
    state.wordarray= state.wordarray.filter(this.checkIsBadChar);

    return state;
  }

  //takes in a test snippet and the max length and returns a random snippet from it.
  randomSnippet(test: string, lineLength: number): string {
    let returnSnippet: string = test;
    //get random integer within a range
    let getRandomInt = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //loop through the string and count all the newline chars and store their index location in an array.
    let lineIndicies = [];
    for(let i = 0; i < test.length; i++) {
      if(test[i] === "\n") lineIndicies.push(i);
    }

    //if the snippet given is longer than lineLength, get a random starting point and clip it
    if(lineIndicies.length > lineLength) {
      let maxNum: number = lineIndicies.length - lineLength;
      let randomStart: number = getRandomInt(0, maxNum);
      returnSnippet = test.slice(lineIndicies[randomStart] + 1, lineIndicies[randomStart + lineLength])
    }

    return returnSnippet;
  }

  ShowCaret(elem: HTMLElement){
    if(elem == null) return;
    elem.style.borderLeft = "solid 0.1em gold";
    elem.style.borderLeftColor = "yellow";
  }
  HideCaret(elem: HTMLElement){
    elem.style.borderLeft = "none";
    elem.style.borderLeftColor = "transparent";
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

  onWordChange(event: KeyboardEvent, elemType: string): void {
    let state = this[elemType + 'State'];
    let currElem = document.getElementById(`${elemType}-char-${state.letterPosition}`) as HTMLElement;
    if(state.finished) return;
    let e = event.key
    let expectedLetter = state.wordarray[state.letterPosition];
    
    if(e == "Enter"){
      e="\n"
    }

    if(e == expectedLetter){
      currElem.style.opacity = "0.3";
      this.HideCaret(currElem);
      state.correctchars +=1;
      state.letterPosition+=1;
      currElem = document.getElementById(`${elemType}-char-${state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
    }
    else if(e == "Backspace"){
      this.HideCaret(currElem);
      state.letterPosition-=1;
      currElem = document.getElementById(`${elemType}-char-${state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
      currElem.style.opacity = "1.0";
      currElem.style.backgroundColor = "#32302f";
    }
    else if(e == "Shift"){
    }
    else{
      this.HideCaret(currElem);
      currElem.style.backgroundColor = "red";
      state.letterPosition+=1;
      currElem = document.getElementById(`${elemType}-char-${state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9-_ ]/.test(inp)){ state.errors+=1; }
    }

    let finishCheck = this.checkIfFinished(state);
    this[elemType+'Wpm'] = finishCheck.wpm;
    this[elemType+'State'] = finishCheck.state;
    if(finishCheck.finished){
      return;
    }

    if(state.wordarray[state.letterPosition]=="\n"){
      //display enter prompt
      currElem.textContent = "⏎\n";
    }
  }

  keyIntercept(event: KeyboardEvent, user: any, elemType: string): void{
    //check for special keycodes if needed
    //has the test started?
    if(!this.testStarted) return;

    //only allow users to type in their respective boxes
    else if(user.role !== elemType) return;

    else this.onWordChange(event, elemType);
  }

  checkIfFinished(state: State): any {
    let numletters = state.wordarray.length-1
    const wpm = Math.floor(this.calcWordsPerMinute(state.correctchars, new Date().getTime() - state.startTime.getTime()));
    //check if words are done
    if(state.letterPosition >= state.wordarray.length){
      console.log('words are done, finishing');
      const timeMillis: number = new Date().getTime() - state.startTime.getTime()
      this.timeTaken = timeMillis;

      //stop timer and flip the flag
      clearInterval(this.intervalId);
      state.finished = true;
      //submit result to the server
      console.log("Test Complete Submitting Results", this.result);
      // this.submitResults();
      return {
        finished: true,
        state: state,
        wpm: wpm
      };
    }
    //did we run out of time instead?
    if(this.timerFinished){
      const timeMillis: number = new Date().getTime() - state.startTime.getTime();
      this.timeTaken = timeMillis;
      state.finished = true;
      // this.submitResults();
      return {
        finished: true,
        state: state,
        wpm: wpm
      };
    }
    return {
      finished: false,
      state: state,
      wpm: wpm
    };
  }

  // observeIfCompFinished(){
  //   const isFinished = of(this.state.finished)
  //   return isFinished
  // }

  startTimer() {
    this.resetTimer();
    this.intervalId = setInterval(() => {
      if (this.timer.seconds - 1 == -1) {
        this.timer.minutes -= 1;
        this.timer.seconds = 59;
      }
      else this.timer.seconds -= 1;
      if (this.timer.minutes == 0 && this.timer.seconds == 0) {
        console.log('ran out of time');
        this.timerFinished = true;
        clearInterval(this.intervalId);
        this.checkIfFinished(this.challengerState);
      }
      }, 1000);
  }

  //ToDo: Turn this into a custom pipe?
  pad(num: number) {
    if(num < 10) return `0${num}`;
    else return num;
  }
  
}
