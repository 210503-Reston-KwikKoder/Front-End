import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../Models/state';
import { RestService } from '../Services/rest.service';
import { of, Subscription } from 'rxjs';
import { CompetitionContent } from '../Models/CompetitionContentModel';
import { CompetitionTestResults } from '../Models/CompetitionTestResults';

@Injectable({
  providedIn: 'root'
})
export class CompFunctionsService {

  constructor(
    private api: RestService
  ) { }

  testmat: CompetitionContent = null;
  state: State;
  timeTaken: number;
  wpm: number;
  expectSpace: boolean;
  skip: boolean;
  category: number;
  sub: Subscription;
  compId: number;
  author: string;

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
    this.expectSpace = false
    this.skip = false
    //get content to type
    this.api.getCompetitionContent(this.compId).then(
      (obj)=> {
              console.log(obj)
              this.category = obj.categoryId
              this.compId = obj.id
              //this.categoryName = Language[this.category]
              this.author = obj.author
              //this.testmat.author = obj.author
              //this.testmat.id = obj.id
              this.state.words = obj.testString
              //this.state.words = this.testmat.testString;
              this.state.wordarray = this.state.words.split('');
              this.state.wordarray= this.state.wordarray.filter(this.checkIsBadChar)
            }
    )
  }

  checkIsBadChar(element: string, index: number, array: any) {
    if((element == "\r") || (element == "\t")){
      return false
    }else{
      return true
    }
  }

  calcWordsPerMinute (charsTyped: number, ms: number): number {
    let result: number;
    if (charsTyped || ms) {
      result = (charsTyped / 5) / (ms / 60000);
    } else {
      console.log("check input ");
    }
    return result;
  }

  onWordChange(event: KeyboardEvent): void {
    if(this.state.finished){
      return
    }
    let e = event.key
    
    if (!this.state.started) {
      this.state.started= true
      this.state.startTime = new Date()
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

  checkIfFinished(): boolean {
    let numletters = this.state.wordarray.length-1

    const wpm = this.calcWordsPerMinute(this.state.correctchars, new Date().getTime() - this.state.startTime.getTime() )
    this.wpm = Math.floor(wpm);

    //check if words are done
    if(this.state.letterPosition >= this.state.wordarray.length){
      const timeMillis: number = new Date().getTime() - this.state.startTime.getTime()
      this.timeTaken = timeMillis;

      console.log("#errors", this.state.errors)
      this.state.finished = true;

      
      return true
    }
    return false;
  }

  observeIfCompFinished(){
    const isFinished = of(this.state.finished)
    return isFinished
  }
  
}
