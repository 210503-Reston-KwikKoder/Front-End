import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LiveCompService } from 'src/Services/live-comp.service';

@Component({
  selector: 'app-live-comps',
  templateUrl: './live-comps.component.html',
  styleUrls: ['./live-comps.component.css']
})
export class LiveCompsComponent implements OnInit {

  public newCompName: any
  public comps: any 
  constructor(
    public livComp: LiveCompService,
    public router: Router
  ) { }

  // Navigates to a competion room given the roomID
  enterRoom(roomId: any){
    this.router.navigate([`ActiveCompetition/${roomId}`])
  }

  // Used to create a better user experience when typing in the input area
  messageInputHandler(e){
    // if enter is pressed execute createNewComp
    if(e.keyCode == 13){
      this.createNewComp()
    }
    // if a space is entered then concat a space (hacky code)
    else if(e.key === " "){
      this.newCompName += e.key
    }
  }

  // Sends a call to the database to create a new room and then navigates to that room on a successful call
  createNewComp(){
    console.log(this.newCompName)
    this.livComp.createNewLiveCompRoom({name: this.newCompName})
    .then((roomId) => {
      this.enterRoom(roomId)
    })
    .catch(err => {
      console.log(err, "unable to create competition room")
    })
    this.newCompName = '';
  }

  checkFOrCompRooms(){
    this.livComp.getAllLiveCompRooms()
    .then(roomArr => {
      this.comps = roomArr 
    })
    .catch(err => {
      console.log(err, "Could not retrive competition rooms")
    })
  }

  ngOnInit(): void {
    this.checkFOrCompRooms()
  }

}
