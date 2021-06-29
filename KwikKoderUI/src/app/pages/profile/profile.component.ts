import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RestService } from 'src/Services/rest.service';
import { StatModel } from 'src/Models/StatModel';
import { Usermodel } from 'src/Models/UserModel';
import { DisplayCategoryPipe } from 'src/app/pipes/display-category.pipe';
import { DisplayPercentPipe } from 'src/app/pipes/display-percent.pipe';
import { DisplayTimePipe } from 'src/app/pipes/display-time.pipe';
import { ProgressGraphComponent } from 'src/app/components/progress-graph/progress-graph.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  username: string = '';
  profileJson: string = null;
  
  constructor(public auth: AuthService, private api: RestService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.auth.idTokenClaims$.subscribe(
      claims => (console.log(claims))
    );
    this.getStats();
    this.getUser();
  }

  updateUserName():void {
    
  }

  UserInfo: Usermodel = new Usermodel();
  statOb: StatModel[] = [];
  
  getUser():void{
    this.api.getUserName().then(
      (obj)=> {this.UserInfo = obj;})
  }

  getStats():void{
    this.api.getUserStats().then(
      (obj)=> {this.statOb = obj;})
    }
}
