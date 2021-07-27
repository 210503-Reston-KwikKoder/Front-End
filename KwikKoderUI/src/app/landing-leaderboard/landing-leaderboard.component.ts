import { Component, OnInit } from '@angular/core';
import { LBModel } from 'src/Models/LBModel';
import { RestService } from 'src/Services/rest.service';

@Component({
  selector: 'app-landing-leaderboard',
  templateUrl: './landing-leaderboard.component.html',
  styleUrls: ['./landing-leaderboard.component.css']
})
export class LandingLeaderboardComponent implements OnInit {

  public koders: LBModel[] = [];

  constructor(private api: RestService) { }

  ngOnInit(): void {
    this.GetBestUsers(-2);
  }

  GetBestUsers(id:number): void{
    this.api.getLeaderBoardByCatagoryId(id)
      .then(
        res => {
          this.koders = res.splice(0, 9);
        }
      );
  }

}
