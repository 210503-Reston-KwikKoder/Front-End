import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { State } from 'src/Models/state';
import { TestMaterial } from 'src/Models/TestMaterial';
import { RestService } from 'src/Services/rest.service';

import { Usermodel } from 'src/Models/UserModel';

import { AppComponent } from 'src/app/app.component';
import { TestModel } from 'src/Models/TestModel';

import { LangSelectComponent } from 'src/app/components/lang-select/lang-select.component';
import { Language } from 'src/Models/LanguageEnum';
import { stringify } from '@angular/compiler/src/util';
import { Subscription } from 'rxjs';
import { CompetitionContent } from 'src/Models/CompetitionContentModel';
import { CompetitionTestResults } from 'src/Models/CompetitionTestResults';
import { DisplayCategoryPipe } from 'src/app/pipes/display-category.pipe';


import {Router} from "@angular/router";
@Component({
  selector: 'app-competition-test',
  templateUrl: './competition-test.component.html',
  styleUrls: ['./competition-test.component.css']
})
export class CompetitionTestComponent implements OnInit {
  langSelected(event: number){
    this.category = event;
    this.newTest()
  }

  constructor(public auth: AuthService, private api: RestService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void{
    //place for category
    this.sub = this.route.params.subscribe(params => {
      this.compId = +params['id'];
      this.newTest();
    });
    //this.newTest();

    
    
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") {
          e.preventDefault();
      }
  }, false);
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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
              this.state.wordarray= this.state.wordarray.filter(this.isBadChar)
            }
    )
  }

  isBadChar(element: string, index: number, array: any) {
    if((element == "\r") || (element == "\t")){
      return false
    }else{
      return true
    }
  } 

  
  wordsPerMinute (charsTyped: number, ms: number): number {
    return ((charsTyped / 5) / (ms / 60000))
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

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
      this.onWordChange(event)

  } 
    
  focusInputArea(): void{
    console.log("giving focus")
    document.getElementById("input-area").focus()
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
    return false;
  }

  submitResults(){
    console.log("posting test results")
    let model: CompetitionTestResults = {
      categoryId:this.category,
      compId: this.compId,
      numberofcharacters : this.state.wordarray.length,
      numberoferrors: this.state.errors,
      timetakenms : this.timeTaken,
      wpm: this.wpm,
      date: new Date()

    }
    console.log(model)
    this.api.postCompetitionResults(model);
    this.router.navigate(['./CompetitionResult/',this.compId]).then();
  }



}
