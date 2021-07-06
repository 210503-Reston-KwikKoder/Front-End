import { Injectable } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { ActivatedRoute, Router } from '@angular/router'
import { State } from '../Models/state'
import { RestService } from '../Services/rest.service'
import { of, Subscription } from 'rxjs'
import { CompetitionContent } from '../Models/CompetitionContentModel'
import { CompetitionTestResults } from '../Models/CompetitionTestResults'
import { ResultModel } from 'src/Models/ResultModel'
import { LiveCompService } from './live-comp.service'
import { QueService } from './que.service'
import { Language } from 'src/Models/LanguageEnum'
import { Statement } from '@angular/compiler'
import { faThList } from '@fortawesome/free-solid-svg-icons'

@Injectable({
  providedIn: 'root'
})
export class CompFunctionsService {

  constructor(
    private api: RestService,
    public liveSer: LiveCompService,
    private queueService: QueService
    ) { }
    
    
  
  live: boolean
  testmat: any = null;
  testStarted: boolean = false;
  challengerState: any;
  currentUser: any;
  winnerState: any;
  challengerWpm: number;
  winnerWpm: number;
  expectSpace: boolean;
  skip: boolean;
  category: number = -1;
  categoryName: string = Language[this.category];
  testComplete: boolean = false
  sub: Subscription
  compId: number
  author: string
  result : ResultModel
  timer = {
    minutes: 1,
    seconds: 0
  }
  intervalId: any
  timerFinished: boolean
  currentWinStreak: number = 0;
  userWon: boolean
  
  resetTimer(): void {
    this.timer = {
      minutes: 0,
      seconds: 30
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

  resetTest(): void{
    console.log("resetting")
    //clearInterval(this.intervalId)
    this.testComplete = false
    this.newTest()
  }
  
  callReset(): void {
    console.log('calling to reset test')
    //also reset everyone else's
    this.liveSer.alertReset(this.compId);  
  }

  finishTest(): void {
    this.testComplete = true;
    clearInterval(this.intervalId);
    alert("Test Finished")
  }
  
  newTest(): void{
    this.winnerWpm = 0;
    this.challengerWpm = 0;
    this.testmat = undefined;
    this.challengerState = {
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
    this.winnerState = {
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

  onWordChange(event: KeyboardEvent, userRole: string): void {
    let state = this[userRole + 'State'];
    state.enteredText = event.key;

    let userState = {
      roomId: this.compId,
      state: state,
      role: userRole,
      wpm: this[userRole + 'Wpm']
    }


    if(this.live){
      this.sendStateToViewers(userRole)
    }
  }

  updateView(userState: any) {
    console.log('updating the view', userState);
    let currElem = document.getElementById(`${userState.role}-char-${userState.state.letterPosition}`) as HTMLElement;
    // if(userState.state.finished) return
    let e = userState.state.enteredText;
    let expectedLetter = userState.state.wordarray[userState.state.letterPosition];
    
    if(e == "Enter"){
      e="\n"
    }

    if(e == expectedLetter){
      currElem.style.opacity = "0.3";
      this.HideCaret(currElem);
      userState.state.correctchars +=1;
      userState.state.letterPosition+=1;
      currElem = document.getElementById(`${userState.role}-char-${userState.state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
    }
    else if(e == "Backspace"){
      this.HideCaret(currElem);
      if(userState.state.letterPosition > 0){
        userState.state.letterPosition-=1;
      }
      currElem = document.getElementById(`${userState.role}-char-${userState.state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
      currElem.style.opacity = "1.0";
      currElem.style.backgroundColor = "#32302f";
    }
    else if(e == "Shift"){

    }
    else{
      this.HideCaret(currElem);
      currElem.style.backgroundColor = "red";
      userState.state.letterPosition+=1;
      currElem = document.getElementById(`${userState.role}-char-${userState.state.letterPosition}`) as HTMLElement;
      this.ShowCaret(currElem);
      if (/[a-zA-Z0-9-_ ]/.test(e)){ 
        userState.state.errors+=1; 
      }
      if(userState.state.wordarray[userState.state.letterPosition]=="\n"){
        //display enter prompt
        currElem.textContent = "⏎\n";
      }
    }
    
    let finishCheck = this.checkIfFinished(userState.state);
    this[userState.role+'Wpm'] = finishCheck.wpm;
    this[userState.role+'State'] = finishCheck.state;
    if(finishCheck.state.finished){
      if(this.live){
        this.sendStateToViewers(userState.role)
      }
      return;
    }
    this[userState.role + 'State'] = userState.state;
  }

  sendStateToViewers(userRole: string){
    console.log('sending it to everybody')
    //sends stuff to socket
    //roomId, userRole: string, state: State, wpm: number
    let userState = {
      roomId: this.compId,
      role: userRole,
      state: this[userRole + 'State'],
      wpm: this[userRole + 'Wpm']
    };
    this.liveSer.sendCompetitionProgress(userState)
  }

  keyIntercept(event: KeyboardEvent, user: any, userRole: string): void{
    //check for special keycodes if needed
    //has the test started?
    if(!this.testStarted) return;

    //only allow users to type in their respective boxes
    else if(user.role !== userRole) return;

    else this.onWordChange(event, userRole);
  }

  checkIfFinished(state: any): any {
    let numletters = state.wordarray.length-1
    const wpm = Math.floor(this.calcWordsPerMinute(state.correctchars, new Date().getTime() - Date.parse(state.startTime)));
    //check if words are done
    if(state.letterPosition >= state.wordarray.length){
      console.log('words are done, finishing');
      const timeMillis: number = new Date().getTime() - Date.parse(state.startTime)
      state.timeTaken = timeMillis;
      //flip this particular user's flag
      state.finished = true;
    }
    // console.log("winnerState = ", this.winnerState.finished)
    // console.log("challengerState = ", this.challengerState.finished)
    this[this.currentUser.role + 'State'] = state;

    //did we run out of time instead?
    if(this.timerFinished){
      const timeMillis: number = new Date().getTime() - Date.parse(state.startTime)
      state.timeTaken = timeMillis;
      state.finished = true;
      this.testComplete = true;

      if(this.currentUser.role == 'winner' || this.currentUser.role == 'challenger'){
        console.log("calculating winner for: ", this.currentUser)
        this.calcWinner()
      }
    }
    //did both people finish?
    else if(this.winnerState.finished && this.challengerState.finished)
    {
      //well, we both finished. Stop the timer and raise the flag
      this.testComplete = true;
      
      if(this.currentUser.role == 'winner' || this.currentUser.role == 'challenger'){
        console.log("calculating winner for: ", this.currentUser)
        this.calcWinner()
      }
      clearInterval(this.intervalId);
    }

    return {
      state: state,
      wpm: wpm
    };
  }

  calcWinner(){
    console.log("Calculating Winner")
    let winnerNetWpm = Math.round(this.winnerWpm - this.winnerState.errors / (this.winnerState.timeTaken / 60000))
    let challengerNetWpm = Math.round(this.challengerWpm - this.challengerState.errors/ (this.challengerState.timeTaken/ 60000))
    let result;
    let assembleResults = (state: State, wpm: number, won: boolean, winStreak: number) => {
      return {
        categoryId: this.category, 
        numberofcharacters: state.wordarray.length, 
        numberoferrors: state.errors,
        wpm: wpm, 
        timetakenms: state.timeTaken, 
        date: new Date(),
        won: won,
        winStreak: winStreak
      };
    };
    if(this.currentUser.role === 'winner')
    {
      if(winnerNetWpm > challengerNetWpm){
        //I won
        //rub it in to everybody
        console.log("You Won!")
        //increase my streak
        this.currentWinStreak++
        result = assembleResults(this.winnerState, winnerNetWpm, true, this.currentWinStreak);
        //also tell the server ==
        this.liveSer.sendRoundResults(this.compId, result)
      }
      else {
        this.currentWinStreak = 0
        console.log("You Lost!")
        result = assembleResults(this.winnerState, winnerNetWpm, false, this.currentWinStreak);
        //boot this person outta queue
        //losers go straight to jail
        this.queueService.removeUserFromQueue(this.compId).then(
          () => this.queueService.alertQueueChangeToSocket(this.compId)
        )
        this.liveSer.sendRoundResults(this.compId, result)
      }
      
    }
    if(this.currentUser.role === 'challenger'){
      if(challengerNetWpm > winnerNetWpm){
        //I won
        this.currentWinStreak = 1
        result = assembleResults(this.challengerState, challengerNetWpm, true, this.currentWinStreak);
        //rub it in to everybody
        console.log("You Won!")
        //increase my streak
        //also tell the server ==
        this.liveSer.sendRoundResults(this.compId, result)
      }
      else {
        this.currentWinStreak = 0
        console.log("You Lost!")
        result = assembleResults(this.challengerState, challengerNetWpm, false, this.currentWinStreak);
        //boot this person outta queue
        //losers go straight to jail
        this.queueService.removeUserFromQueue(this.compId).then(
          () => this.queueService.alertQueueChangeToSocket(this.compId)
        ).catch(err => {
          console.log("failed to remove user: ", err)
        })
        
        this.liveSer.sendRoundResults(this.compId, result)
      }
    }
    
  }

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
        // this.checkIfFinished(this.challengerState);
      }
      }, 1000);
  }

  //ToDo: Turn this into a custom pipe?
  pad(num: number) {
    if(num < 10) return `0${num}`;
    else return num;
  }
  
}
