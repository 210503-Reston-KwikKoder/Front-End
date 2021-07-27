import { Component, Inject, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { NavigationMenu } from 'src/Models/NavigationMenu';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    './nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {
  isCollapsed = false;
  navigationMenu: NavigationMenu[] = [
    { name: 'Take a Test', route: 'test' },
    { name: 'Profile', route: 'profile' },
    { name: 'Competitions', route: 'competitions' },
    { name: 'New Competition', route: 'NewCompetition' },
    { name: 'Live Competitions', route: 'LiveCompetitions' },
    { name: 'Leaderboards', route: 'leaderboard' },
    { name: 'Discussion Forum', route: 'forum' }
  ];
  loadingImg =
    'https://api.freelogodesign.org/files/4981cd4ed1774227824e712939d53c78/thumb/logo_200x200.png?v=637588683320000000';
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {
  }

  ngOnInit(): void {
  }
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
  signinWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  displayMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

}
