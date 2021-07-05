import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { State } from 'src/Models/state';
import { TestMaterial } from 'src/Models/TestMaterial';
import { RestService } from 'src/Services/rest.service';
import { TestModel } from 'src/Models/TestModel';
import { Language } from 'src/Models/LanguageEnum';
import { Router } from "@angular/router";
import { templateJitUrl } from '@angular/compiler';
import { ResultModel } from 'src/Models/ResultModel';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  /*# variables declare at the top */
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
  intervalId: any;

  constructor(public auth: AuthService, private api: RestService, private router:Router) { }

  ngOnInit(): void{
    this.result = {
      text : "Keep working at typing!",
      image :"slow"
    };
    this.category = -1;
    this.newTest();
    document.documentElement.addEventListener('keydown', function (e) {
      if (( e.key) == " ") { e.preventDefault();}
    }, false);
  }

  langSelected(event: number){
    this.category = event;
    this.newTest()
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  newTest(): void{
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
    this.skip = false;
    this.state.wordarray = [];
    clearInterval(this.intervalId);
    //get content to type
    this.api.getTestContentByCatagoryId(id).then(
      (obj)=> {
        this.testmat = obj;
        this.state.words = this.testmat.content;
        this.state.wordarray = this.state.words.split('');
        this.state.wordarray= this.state.wordarray.filter(this.isBadChar);

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

  

  isBadChar(element: string, index: number, array: any) {
    if((element == "\r") || (element == "\t")){
      return false;
    }else{
      return true;
    }
  }

  wordsPerMinute (charsTyped: number, ms: number): number {
    return ((charsTyped / 5) / (ms / 60000))
  }

  onWordChange(event: KeyboardEvent): void {
    if(this.state.finished){ return }
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
      if(this.state.letterPosition > 0){
        this.state.letterPosition-=1; 
      }
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
      return
    }
    if(this.state.wordarray[this.state.letterPosition]=="\n"){
      //display enter prompt
      (document.getElementById(`char-${this.state.letterPosition}`) as HTMLElement).textContent = "⏎\n";
    }
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
    console.log('intercepting key strokes', event);
    this.onWordChange(event)
  }

  focusInputArea(): void{
    console.log("giving focus", document.getElementById("input-area"));
    document.getElementById("input-area").focus();
    this.ShowCaret();
  }

  checkIfFinished(): boolean {
    let numletters = this.state.wordarray.length-1

    const wpm = this.wordsPerMinute(this.state.correctchars, new Date().getTime() - this.state.startTime.getTime() )
    this.wpm = Math.floor(wpm);

    //check if words are done
    console.log('checking for doneness', this.state)
    if(this.state.letterPosition >= this.state.wordarray.length){
      console.log('tis done');
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
      this.timeTaken = timeMillis;
      console.log("#errors", this.state.errors);

      //stop timer and flip the flag
      clearInterval(this.intervalId);
      this.state.finished = true;
      //submit result to the server
      console.log("Test Complete Submitting Results");
      this.submitResults();
      return true;
    }
    //did we run out of time instead?
    if(this.timerFinished){
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime();
      this.timeTaken = timeMillis;
      console.log("#errors", this.state.errors);
      this.state.finished = true;
      this.submitResults();
      return true;
    }

    return false;
  }

  submitResults(){
    console.log("posting test results")
    let model: TestModel = {
      categoryId: this.category,
      numberofcharacters : this.state.correctchars,
      numberoferrors: this.state.errors,
      timetakenms : this.timeTaken,
      wpm: this.wpm,
      date: new Date()
    }
    console.log(model)
    this.api.postTestResults(model);
    if(this.wpm < 30){
      this.result.text = "Keep working at typing!";
      this.result.image = "slow";
    }
    else if (this.wpm < 50 && this.wpm > 30){
      this.result.text = "You're improving!";
      this.result.image = "good";
    }
    else if (this.wpm > 50){
      this.result.text= "You're a programming genius!";
      this.result.image = "pro";
    }
  }

  pad(num: number) {
    if(num < 10) return `0${num}`;
    else return num;
  }

  startTimer() {
    this.minutes = 1
    this.seconds = 0 // choose whatever you want
    this.intervalId = setInterval(() => {
      if (this.seconds - 1 == -1) {
        this.minutes -= 1;
        this.seconds = 59;
      }
      else this.seconds -= 1;
      if (this.minutes === 0 && this.seconds == 0) {
        this.timerFinished = true;
        clearInterval(this.intervalId);
        this.checkIfFinished();
      }
      }, 1000);
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
}

