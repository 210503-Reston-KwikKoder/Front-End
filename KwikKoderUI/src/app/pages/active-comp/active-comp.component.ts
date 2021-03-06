import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/Services/chat.service';
// import { RestService } from 'src/Services/rest.service';
import { CompFunctionsService } from 'src/Services/comp-functions.service';
import { QueService } from 'src/Services/que.service';
import { LiveCompService } from 'src/Services/live-comp.service';
import { AuthService } from '@auth0/auth0-angular';
import { Language } from 'src/Models/LanguageEnumModel';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Socket } from 'ngx-socket-io';
//FontAwesome
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-active-comp',
  templateUrl: './active-comp.component.html',
  styleUrls: ['./active-comp.component.css']
})
export class ActiveCompComponent implements OnInit, OnDestroy{
  //Font Awesome Variables
  faCommentDots= faCommentDots;
  

  roomId: any;
  //roles: winner, challenger, observer
  currentUser = {
    id: '',
    name: '',
    role: ''
  };
  currentTest: any
  currentWinner: any
  currentChallenger: any
  winnerName: string;
  isQuote: boolean;
  showChat: boolean;

  constructor(
    private chatService: ChatService,
    // private restService: RestService,
    private route: ActivatedRoute,
    public comp: CompFunctionsService,
    private queue: QueService,
    private liveComp: LiveCompService,
    public auth: AuthService,
    private window: Window,
    private socket: Socket
    ) {
      this.roomId = this.route.snapshot.paramMap.get('compId')
    }

    
  // enters the user into the correct room in the socket
  joinSocketRoom(){
    console.log('joining socket room..')
    this.chatService.joinSocketRoom(this.roomId)
  }

  newWinnerAndChallenger(users){
    this.currentWinner = users.winner ?? undefined; 
    this.currentChallenger = users.challenger ?? undefined;
    this.assignRole()
  }

  assignRole() {
    if(this.currentUser?.id == this.currentWinner?.userId) this.currentUser.role = 'winner';
    else if(this.currentUser?.id == this.currentChallenger?.userId) this.currentUser.role = 'challenger';
    else this.currentUser.role = 'observer';
    this.comp.currentUser = this.currentUser;
  }

  setListenForNewTest(){
    this.liveComp
    .listenForNewTest()
    .subscribe((test: any) => {
      console.log("Receiving test", test)
      this.comp.resetTest();
      this.currentTest = test
      this.comp.winnerState = this.comp.formatTest(test, this.comp.winnerState);
      this.comp.challengerState = this.comp.formatTest(test, this.comp.challengerState);
      
      this.comp.startTest();
      if(this.comp.category == -1){
        this.isQuote = true;
      }
      else{
        this.isQuote = false;
      }
    })
  }

  setListenForCompProgress(){
    this.liveComp.listenForCompProgress()
    .subscribe((userState: any) => {
      // console.log('active comp listened comp-progress', userState);
      this.comp[userState.role + 'Wpm'] = userState.wpm;
      this.comp[userState.role + 'State'] = userState.state;
      this.comp.updateView(userState);
    })
  }

  setListenForWinnerFound(){
    this.liveComp.listenForRoundWinner()
    .subscribe((winnerName: any) => {
      console.log('active comp has listened to the new winner')
      this.winnerName = winnerName;
    })
  }

  setListenForTestReset() {
    this.liveComp.listenForReset()
    .subscribe(() => {
      console.log('active comp listened to the reset test');
      this.winnerName = null;
      this.comp.resetTest();
    })
  }

  ngOnInit(): void {
    // tells the comp-functions it is live
    this.comp.live = true
    this.comp.compId = this.roomId;
    // enters user into the socket room
    this.joinSocketRoom();
    // sets the user Id
    this.auth.user$.subscribe((profile) => {
      this.currentUser.id = profile.sub;
      this.currentUser.name = profile.name;
      this.comp.currentUser = this.currentUser;
    });
    this.liveComp.connectToService();
    this.setListenForNewTest()
    this.setListenForCompProgress()
    this.setListenForWinnerFound();
    this.setListenForTestReset();
    this.comp.newTest();

    if(this.comp.category == -1){
      this.isQuote = true;
    }
    else{
      this.isQuote = false;
    }

    this.window.addEventListener("beforeunload", () => {
      alert('unloading');
      this.queue.removeUserFromQueue(this.roomId)
      .then(() => {
        this.queue.alertQueueChangeToSocket(this.roomId)
      })
    })

    this.window.onunload = () => {
      this.queue.removeUserFromQueue(this.roomId)
      .then(() => {
        this.queue.alertQueueChangeToSocket(this.roomId)
      })
    }
    console.log(this.window)

    // prevents page scroll when hitting the spacebar
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.key) == " ") e.preventDefault();}, false);
  }

  langSelected(event: number){
    this.comp.category = event;
    this.comp.categoryName = Language[event];
    this.comp.newTest();
    if(this.comp.category == -1){
      this.isQuote = true;
    }
    else{
      this.isQuote = false;
    }
  }
  showChatFunc(): void{
    this.showChat = !this.showChat;
  }
  // if the user leaves the room they are removed from the que 
  ngOnDestroy(){
    this.queue.removeUserFromQueue(this.roomId)
    .then(() => {
      this.queue.alertQueueChangeToSocket(this.roomId)
      this.liveComp.disconnectFromService();
    })
    .catch(err => {
      this.chatService.leaveSocketRoom(this.roomId);
      this.liveComp.disconnectFromService();
      console.log(err)
    })
  }

}
