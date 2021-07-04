import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/Services/chat.service';
// import { RestService } from 'src/Services/rest.service';
import { CompFunctionsService } from 'src/Services/comp-functions.service';
import { QueService } from 'src/Services/que.service';
import { LiveCompService } from 'src/Services/live-comp.service';
import { AuthService } from '@auth0/auth0-angular';
import { Language } from 'src/Models/LanguageEnum';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit, OnDestroy{
  roomId: any
  //roles: winner, challenger, observer
  currentUser = {
    id: '',
    name: '',
    role: ''
  };
  currrentTest: any
  currentWinner: any
  currentChallenger: any

  constructor(
    private chatService: ChatService,
    // private restService: RestService,
    private route: ActivatedRoute,
    public comp: CompFunctionsService,
    private queue: QueService,
    private liveComp: LiveCompService,
    public auth: AuthService
    ) {
      this.roomId = this.route.snapshot.paramMap.get('compId')
    }

  // enters the user into the correct room in the socket
  joinSocketRoom(){
    this.chatService.joinSocketRoom(this.roomId)
  }

  newWinnerAndChallenger(users){
    this.currentWinner = users.winner
    this.currentChallenger = users.challenger
    this.assignRole()
  }

  assignRole() {
    if(!this.currentUser || !this.currentWinner || !this.currentChallenger) return;
    else if(this.currentUser.id == this.currentWinner.userId) this.currentUser.role = 'winner';
    else if(this.currentUser.id == this.currentChallenger.userId) this.currentUser.role = 'challenger';
    else this.currentUser.role = 'observer';
  }

  keyIntercept(event: KeyboardEvent): void{
    //check for special keycodes if needed
    if (event){
      // this.comp.onWordChange(event)
    } else {
      console.log("check event: " + event);
    }
  }

  focusInputArea(): void{
    document.getElementById("input-area").focus();
  }

  setListenForRoundStart(){
    this.liveComp
    .listenForRoundStart()
    .subscribe(() => this.comp.startTest())
  }

  setListenForNewTest(){
    this.liveComp
    .listenForNewTest()
    .subscribe((test) => {
      this.currrentTest = test
      this.comp.formatTest(test);
      this.liveComp.emitStartTest();
    })
  }

  ngOnInit(): void {
    // enters user into the socket room

    this.joinSocketRoom();
    // sets the user Id
    this.auth.user$.subscribe((profile) => {
      this.currentUser.id = profile.sub;
      this.currentUser.name = profile.name;
    });
    this.setListenForRoundStart()
    this.setListenForNewTest()
    this.comp.newTest();

    // prevents page scroll when hitting the spacebar
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") e.preventDefault();}, false);
  }

  langSelected(event: number){
    this.comp.category = event;
    this.comp.categoryName = Language[event];
    this.comp.newTest();
  }

  // if the user leaves the room they are removed from the que 
  ngOnDestroy(){
    this.queue.removeUserFromQueue(this.roomId)
    .then(() => {
      this.queue.alertQueueChangeToSocket(this.roomId)
    })
    .catch(err => console.log(err))
  }

}
