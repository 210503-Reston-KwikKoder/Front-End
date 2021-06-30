import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Console } from 'console';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  // username: string = '';
  profileJson: string = null;
  message : string = '';
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.auth.idTokenClaims$.subscribe(
      claims => (console.log(claims))
    );
  }
  CreateCompetition():void{
    console.log('message',this.message);
  }

}
