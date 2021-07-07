import { Component, OnInit } from '@angular/core';
import { LBModel } from 'src/Models/LBModel';
import { RestService } from 'src/Services/rest.service';
import { LangSelectComponent } from 'src/app/components/lang-select/lang-select.component';
import { DisplayPercentPipe } from 'src/app/pipes/display-percent.pipe';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  LBModels: LBModel[] = []
  FilteredLBModels: LBModel [] = []
  catId : number
  text: string;

  langSelected(event: number){
    this.catId = event;
    console.log('category event****',event);
    console.log(this.catId);
    this.GetBestUsers(this.catId)    
  }
  constructor(private api: RestService) { 
    //this.catId = id;
  }

  ngOnInit(): void {
    this.catId = -2;
    this.GetBestUsers(this.catId);    
  }
  GetBestUsers(id:number): void{
    this.catId = id;
    this.api.getLeaderBoardByCatagoryId(id).then(
      res => {
        this.LBModels = res;
        this.FilteredLBModels = res;
      }); 
      
  }
  public SearchLetters() :void{
    if(this.text){
      this.FilteredLBModels = this.LBModels.filter((LBModel)=> 
      {
        if(LBModel.userName){
          return LBModel.userName.includes(this.text)
        }else{
          return LBModel.name.includes(this.text)
        }        
      });
    }else{
      this.FilteredLBModels = this.LBModels
    }
  }

}
