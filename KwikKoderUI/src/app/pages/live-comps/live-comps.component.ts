import { Component, OnInit } from '@angular/core';
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
    public livComp: LiveCompService
  ) { }

  enterRoom(roomId: any){
    console.log(roomId)
  }

  messageInputHandler(e){
    if(e.keyCode == 13){
      this.createNewComp()
    }else if(e.key === " "){
      this.newCompName+= e.key
    }
  }

  createNewComp(){
    this.livComp.createNewLiveCompRoom(this.newCompName);
    this.newCompName = '';
  }

  ngOnInit(): void {
  }

}
